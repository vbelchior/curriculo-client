import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AddressEntity } from '@commons/entities/address';
import { TypeUtil } from '@commons/utils';
import { Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<UserEntity> {
  constructor(private userService: UserService) {}

  private initialize(user: UserEntity): UserEntity {
    if (!TypeUtil.exists(user.extra)) user.extra = {};
    if (!TypeUtil.exists(user.address)) user.address = new AddressEntity();
    return user;
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserEntity> {
    const idPath: string = route.paramMap.get('id');
    if (idPath == 'new') return of(this.initialize(new UserEntity()));

    return this.userService.retrieve(idPath).pipe(take(1));
  }
}
