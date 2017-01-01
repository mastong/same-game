import { Component } from '@angular/core';

import { UserModel } from './user.model';
import { UserService } from './user.service';


@Component({
  selector: 'my-app',
  template: `
    <h1>Angular 2 application bootstrap</h1>
    <input type="text" name="firstName" [(ngModel)]="tempFirstName" placeholder="firstName">
    <input type="text" name="lastName" [(ngModel)]="tempLastName" placeholder="lastName">
    <button class="btn btn-success" type="button" name="add" (click)="addUser();">Add</button>
    <br>
    <ul>
      <li *ngFor="let user of users">
        {{getFullName(user)}}
      </li>
    </ul>
  `,
  providers: [UserService]
})
export class AppComponent {

  private tempFirstName: string;
  private tempLastName: string;

  private users: Array<UserModel>;

  constructor(private userService: UserService){
    this.users = new Array<UserModel>();
  }

  /**
   * Do something when the component is initialized
   */
  public ngOnInit() {

  }

  private addUser(){
    if(this.tempLastName && this.tempFirstName){
      let user = new UserModel(this.tempFirstName, this.tempLastName);
      this.users.push(user);
    }else{
      alert("You must enter a name");
    }
  }

  private getFullName(user: UserModel): string{
    return this.userService.getFullName(user);
  }
}
