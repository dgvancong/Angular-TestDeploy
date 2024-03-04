import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserInterfaceService } from '../../user-interface.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss',
  standalone: true,
  imports:[
    CommonModule,
    RouterModule,
    NzIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NzAlertModule,
    NzSelectModule
  ]
})
export class UserSignupComponent implements OnInit {
  user = {
    picture: '/assets/img/ee2660df9335718b1a80.svg',
    fullName: '',
    password: '',
    emailAddress: '',
    phoneNumber: '',
    roleID: ''
  };
  roles: any[] = [];
  selectedValue: any;
  registrationSuccess = false;
  registrationError = false;
  showPassword = false;
  constructor(private userService: UserInterfaceService){}
  ngOnInit(): void {
    this.fetchRoles();
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  fetchRoles() {
    this.userService.getRoles().subscribe(
      (response) => {
        this.roles = response;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
  registerUser() {
    this.userService.registerUser(this.user).subscribe(
      (response) => {
        this.registrationSuccess = true;
        this.registrationError = false;
      },
      (error) => {
        this.registrationSuccess = false;
        this.registrationError = true;
      }
    );
  }
}
