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
} from '@angular/fire/firestore';
import { AddressEntity, ViaCep } from '@commons/entities/address';
@Injectable()
export class UserService {
  private path: string = 'users';

  private usersRef: any;

  constructor(private httpClient: HttpClient, private firestore: Firestore) {
    this.usersRef = collection(this.firestore, 'users');
  }

  private convertToObject(entity: UserEntity): object {
    if (Object.keys(entity.address).length > 0) {
      entity.address = Object.assign({}, entity.address);
    }
    return Object.assign({}, entity);
  }

  public create(entity: UserEntity): Observable<any> {
    const usersRef = collection(this.firestore, 'users');
    const userToObject = this.convertToObject(entity);
    const promise = addDoc(usersRef, userToObject);
    return from(promise);
  }
  // public create(entity: UserEntity): Observable<UserEntity> {
  //   const path: string = `${environment.server}/users`;
  //   return this.httpClient.post<UserEntity>(path, entity);
  // }

  public retrieve(id: string): Observable<UserEntity> {
    if (!TypeUtil.exists(id)) return of(new UserEntity());
    const userRef = doc(this.firestore, `users/${id}`);
    return docData(userRef, { idField: 'id' }) as Observable<UserEntity>;
  }

  public update(id: string, entity: UserEntity): Observable<Object> {
    const path: string = `${environment.server}/users/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.patch(path, entity, { params: query });
  }

  public replace(id: string, entity: UserEntity): Observable<Object> {
    const path: string = `${environment.server}/users/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.put(path, entity, { params: query });
  }

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

  public count(nameLike?: string, titleLike?: string): Observable<number> {
    const path: string = `${environment.server}/users/count/value`;
    let query: HttpParams = new HttpParams();
    if (TypeUtil.hasText(nameLike)) query = query.set('nameLike', nameLike);
    if (TypeUtil.hasText(titleLike)) query = query.set('titleLike', titleLike);
    return this.httpClient.get<number>(path, { params: query });
  }
  public searchByCep(code: string): Observable<ViaCep> {
    if (code.length != 8) return;
    const path: string = `https://viacep.com.br/ws/${code}/json`;
    return this.httpClient.get<ViaCep>(path);
  }
}
