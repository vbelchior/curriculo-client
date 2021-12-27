import { AddressEntity } from '@commons/entities/address';

export class UserEntity {
  public id?: string;

  public name: string;

  public phone?: string;

  public email: string;

  public secret: string;

  public address?: AddressEntity;

  public extra?: object;

  public emailVerified?: boolean;

  constructor(json?: any) {
    if (json != undefined && json != null) {
      const keys: Array<string> = Object.keys(json);
      if (keys.includes('id')) this.id = json.id ? String(json.id) : json.id;
      if (keys.includes('name'))
        this.name = json.name ? String(json.name) : json.name;
      if (keys.includes('email'))
        this.email = json.email ? String(json.email) : json.email;
      if (keys.includes('secret'))
        this.secret = json.secret ? String(json.secret) : json.secret;
      if (keys.includes('phone'))
        this.phone = json.phone ? String(json.phone) : json.phone;
      if (keys.includes('extra'))
        this.extra = json.extra ? Object(json.extra) : json.extra;
      if (keys.includes('address'))
        this.address = json.address
          ? new AddressEntity(json.address)
          : json.address;

      if (keys.includes('emailVerified'))
        this.emailVerified = json.emailVerified
          ? Object(json.emailVerified)
          : json.emailVerified;
    }
  }
}
