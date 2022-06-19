export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone: string;
  password: string;
  subscriptionType: UserObject.SubscriptionType;
  type: UserObject.Type;
  isAdmin: boolean;
  companies: string[];
}

export namespace UserObject {
  export enum SubscriptionType {
    FREE = 'FREE',
    CUSTOMER = 'CUSTOMER',
  }

  export enum Type {
    SUBSTITUTE = 'SUBSTITUTE',
    ASSOCIATE = 'ASSOCIATE',
  }

  export enum ExceptionKey {
    ALREADY_IN_COMPANY = 'ALREADY_IN_COMPANY',
  }
}
