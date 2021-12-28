import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { UserEntity } from './user.entity';
import { environment } from '@environments/environment';
import { TypeUtil } from '@commons/utils';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import { AddressEntity, ViaCep } from '@commons/entities/address';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private firestore: Firestore) {}

  private convertToObject(entity: UserEntity): object {
    if (Object.keys(entity.address).length > 0) {
      entity.address = Object.assign({}, entity.address);
    }
    return Object.assign({}, entity);
  }

  public create(entity: UserEntity): Observable<any> {
    const usersRef = collection(this.firestore, 'users');
    const userToObject = this.convertToObject(entity);
    return from(addDoc(usersRef, userToObject));
  }

  public retrieve(id: string): Observable<UserEntity> {
    if (!TypeUtil.exists(id)) return of(new UserEntity());
    const userRef = doc(this.firestore, `users/${id}`);
    return docData(userRef, { idField: 'id' }) as Observable<UserEntity>;
  }

  public update(id: string, entity: UserEntity): Observable<any> {
    const bookDocRef = doc(this.firestore, `users/${id}`);
    const userToObject = this.convertToObject(entity);
    return from(setDoc(bookDocRef, userToObject));
  }

  public replace(id: string, entity: UserEntity): Observable<Object> {
    const path: string = `${environment.server}/users/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.put(path, entity, { params: query });
  } //

  public delete(id: string): Observable<any> {
    if (!TypeUtil.exists(id)) return throwError(new UserEntity());
    const bookDocRef = doc(this.firestore, `users/${id}`);
    return from(deleteDoc(bookDocRef));
  }

  public filter(
    nameLike?: string,
    offset?: number,
    limit?: number
  ): Observable<UserEntity[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }) as Observable<
      UserEntity[]
    >;
  }

  public searchByCep(code: string): Observable<ViaCep> {
    if (code.length != 8) return;
    const path: string = `https://viacep.com.br/ws/${code}/json`;
    return this.httpClient.get<ViaCep>(path);
  }
}
