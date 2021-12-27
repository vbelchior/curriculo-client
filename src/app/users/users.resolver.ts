import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UsersResolver implements Resolve<any[]> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserEntity[]> {
    //const subject: Subject<UserEntity[]> = new Subject<UserEntity[]>();
    // return this.userService.retrieve(idPath).pipe(take(1));
    return this.userService.filter().pipe(first());

    // const fetchPromise: Promise<UserEntity[]> = this.userService
    //   .filter()
    //   .toPromise();
    // Promise.all<UserEntity[]>([fetchPromise])
    //   .then((fetch) => {
    //     subject.next(fetch);
    //   })
    //   .catch(() => {
    //     subject.next([]);
    //   })
    //   .finally(() => subject.complete());
    // return subject.asObservable();
  }
}
