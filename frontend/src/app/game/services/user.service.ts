import { Injectable } from '@angular/core';
import { Auth, User as CurrentUser } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  setDoc,
  CollectionReference,
  collectionData,
  doc,
  where,
  query,
} from '@angular/fire/firestore';
import { User } from '../interface/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private refCollectUser: CollectionReference = collection(this.store, 'users');

  constructor(private auth: Auth, private store: Firestore) {}

  getCurrentUser(): CurrentUser | null {
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
    const query_personal = query(
      this.refCollectUser,
      where('uid', '!=', this.getCurrentUser()?.uid)
    );
    return collectionData(query_personal, { idField: 'uid' }) as Observable<
      User[]
    >;
  }
}
