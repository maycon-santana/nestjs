/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import * as admin from 'firebase-admin';
import DefaultResponseDTO from '../../../dist/models/default.responseDto';

interface ExecuteData {
  user: admin.auth.DecodedIdToken;
  page?: any;
}

@Injectable()
export class YoutubeService {

    public async execute({
        user, 
        page,
    }: ExecuteData): Promise<DefaultResponseDTO<youtube_v3.Schema$LiveBroadcastListResponse>
    > {}

}
