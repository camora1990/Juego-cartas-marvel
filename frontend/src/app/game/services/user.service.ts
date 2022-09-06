import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  setDoc,
  CollectionReference,
  collectionData,
  doc,
} from '@angular/fire/firestore';
import { User } from '../interface/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private refCollectUser: CollectionReference = collection(
    this.store,
    'users'
  );

  constructor(private auth: Auth, private store: Firestore) {}

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async addUser(user: User) {
    const userRef = doc(this.refCollectUser, user.uid);
    return setDoc(userRef, user);
  }

  updateUser(user: User) {
    const userRef = doc(this.refCollectUser, user.uid);
    return setDoc(userRef, user);
  }

  getUsers(): Observable<User[]> {
    return collectionData(this.refCollectUser, {
      idField: 'uid',
    }) as Observable<User[]>;
  }
}
