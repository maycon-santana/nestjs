/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import lodash from 'lodash';

import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebase.service';

import DefaultResponseDTO from 'src/models/default.responseDto';
import ProviderDTO from 'src/models/youtube.model';

interface ExecuteData {
  user: admin.auth.DecodedIdToken;
  id: string;
  page?: any;
}

@Injectable()
export class YoutubeDetailsService {
    constructor(private firebaseService: FirebaseService) {}

    public async execute({
        user,
        id,
        page,
      }: ExecuteData): Promise<
        DefaultResponseDTO<{
            chat: youtube_v3.Schema$LiveBroadcastListResponse | null;
            broadcast: youtube_v3.Schema$LiveBroadcast;
        }>
      > {
        let snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;
        let chat: youtube_v3.Schema$LiveBroadcastListResponse | null;
        let broadcast: youtube_v3.Schema$LiveBroadcast;

      try {
        snapshot = await admin
          .firestore()
          .collection('userProviders')
          .where('userUid', '==', user.uid)
          .where('provider', '==', 'youtube')
          .get();
      } catch (e) {
        const error = e as admin.FirebaseError;

        throw new Error(error.message);
      }

      if (snapshot.size > 0) {
        const doc = lodash.first(snapshot.docs);
        const data = doc.data() as ProviderDTO;
        const youTube = google.youtube('v3');

        try {
            const liveBroadcastsResponse = await youTube.liveBroadcasts.list(
                {
                key: process.env.GCP_PROJECT_YOUTUBE_API_KEY,
                part: ['id', 'snippet', 'status'],
                maxResults: 50,
                id: [id],
                },
                {
                headers: { authorization: `${data.tokenType} ${data.accessToken}` },
                },
            );

            broadcast = lodash.first(liveBroadcastsResponse.data.items);

            if (broadcast) {
                try {
                const liveChatMessageListResponse =
                    await youTube.liveChatMessages.list(
                    {
                        key: process.env.GCP_PROJECT_YOUTUBE_API_KEY,
                        part: ['id', 'snippet', 'authorDetails'],
                        liveChatId: broadcast.snippet.liveChatId,
                        maxResults: 2000,
                        pageToken: page,
                    },
                    {
                        headers: {
                        authorization: `${data.tokenType} ${data.accessToken}`,
                        },
                    },
                    );

                chat = {
                    ...liveChatMessageListResponse.data,
                    items: [...liveChatMessageListResponse.data.items].reverse(),
                };

                return {
                    message: 'Broadcast details fetched successfully',
                    data: { broadcast, chat },
                };
                } catch (e) {
                return {
                    message: 'Broadcast details fetched successfully',
                    data: { broadcast, chat },
                };
                }
            } else {
                throw new Error('Broadcast not found');
            }
            } catch (e) {
            throw new Error('liveBroadcasts request error');
            }
        } else {
            throw new Error('YouTube Provider not found');
        }
    }
}
