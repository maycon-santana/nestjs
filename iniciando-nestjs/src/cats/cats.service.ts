/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Cat } from 'src/models/cat.model';
import { FirebaseService } from '../firebase/firebase.service';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
  } from 'firebase/auth';

  import {
    doc,
    setDoc,
    DocumentReference,
    getDoc,
    DocumentSnapshot,
    DocumentData,
  } from 'firebase/firestore';

@Injectable()
export class CatsService {
    constructor(private firebaseService: FirebaseService) {}

    public async login(
        email: string,
        password: string,
      ): Promise<Omit<Cat, 'password'>> {
        // Firebase logic here
        try {
          const userCredential: UserCredential = await signInWithEmailAndPassword(
            this.firebaseService.auth,
            email,
            password,
          );

          if (userCredential) {
            const id: string = userCredential.user.uid;
            const docRef: DocumentReference = doc(
              this.firebaseService.usersCollection,
              id,
            );
            const snapShot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
            const loggedUser: Cat = {
              ...snapShot.data(),
              id: snapShot.id,
            } as Cat;

            delete loggedUser.password;
            console.log('Login feito com sucesso');
            return loggedUser;
          }
        } catch (error: unknown) {
          console.warn(`Não foi possivel logar ${error}`);
        }
      }

    public async register(body: Omit<Cat, 'id'>): Promise<void> {
        try {
            const userCredential: UserCredential =
                await createUserWithEmailAndPassword(
                this.firebaseService.auth,
                    body.email,
                    body.password,
                );

            if (userCredential) {
                const id: string = userCredential.user.uid;
                const docRef: DocumentReference = doc(
                  this.firebaseService.usersCollection,
                  id,
                );
                await setDoc(docRef, body);
              }
            } catch (error: unknown) {
              console.warn(`[ERROR] ${error}`);
        }
    }
}