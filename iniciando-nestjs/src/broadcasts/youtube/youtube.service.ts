/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import * as admin from 'firebase-admin';
import lodash from 'lodash';

import DefaultResponseDTO from 'src/models/default.responseDto';
import { FirebaseService } from 'src/firebase/firebase.service';
import ProviderDTO from 'src/models/youtube.model';

interface ExecuteData {
  user: admin.auth.DecodedIdToken;
  page?: any;
}

@Injectable()
export class YoutubeService {
    constructor(private firebaseService: FirebaseService) {}

    public async execute({
        user,
        page,
      }: ExecuteData): Promise<
        DefaultResponseDTO<youtube_v3.Schema$LiveBroadcastListResponse>
      > {
        let snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

        try {
            snapshot = await admin
                .firestore()
                .collection('userProviders')
                .where('userUid', '==', user.uid)
                .where('provider', '==', 'youtube')
                .get();
            }catch (e) {
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
                      broadcastStatus: 'all',
                      broadcastType: 'all',
                      pageToken: page,
                      maxResults: 50,
                    },
                    {
                      headers: { authorization: `${data.tokenType} ${data.accessToken}` },
                    },
                  );

                  return {
                    message: 'Successfully listed broadcasts',
                    data: liveBroadcastsResponse.data,
                  };
                } catch (e) {
                  throw new Error('liveBroadcasts request error');
                }
              } else {
                throw new Error('YouTube Provider not found');
        }
    }
}



