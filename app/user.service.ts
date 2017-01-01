import { Injectable } from '@angular/core';
import { UserModel } from './user.model';

@Injectable()
export class UserService{

  constructor(){ }

  /**
   * Returns the "firstName lastName" of the given user
   * @param user - the user to display
   * @returns the user full name
   */
  public getFullName(user: UserModel): string {
    return user.firstName + " " + user.lastName;
  }
}
