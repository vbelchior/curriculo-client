import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UsersResolver implements Resolve<any[]> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserEntity[]> {
    const subject: Subject<UserEntity[]> = new Subject<UserEntity[]>();
    this.userService.filter().subscribe((result) => console.debug(result));
    const fetchPromise: Promise<UserEntity[]> = this.userService
      .filter()
      .toPromise();
    Promise.all<UserEntity[]>([fetchPromise])
      .then(([fetch]) => {
        subject.next(fetch);
      })
      .catch(() => {
        subject.next([]);
      })
      .finally(() => subject.complete());
    return subject.asObservable();
  }
}
