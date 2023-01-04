/* eslint-disable prettier/prettier */
import * as admin from 'firebase-admin';

interface ProviderDTO {
    updatedAt: admin.firestore.FieldValue;
    createdAt: admin.firestore.FieldValue;
    provider: ProviderDTO;
    refreshToken: string;
    accessToken: string;
    expiryDate: number;
    tokenType: string;
    userUid: string;
    scope: string;
}

export default ProviderDTO;