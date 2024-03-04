import { Component} from '@angular/core';
import { RouterModule, Router  } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { UserInterfaceService } from '../../../User - Interface/user-interface.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NzAlertModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  user = {
    emailAddress: '',
    password: ''
  };
  showPassword = false;
  loginSuccess = false;
  loginError = false;
  constructor(private userService: UserInterfaceService,private router: Router){}
  login() {
    this.userService.login(this.user).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.loginSuccess = true;
        this.loginError = false;
        setTimeout(() => {
          this.router.navigate(['/user/welcome-home']);
        }, 1000);
      },
      (error) => {
        console.error('Login failed:', error);
        this.loginSuccess = false;
        this.loginError = true;
      }
    );
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
