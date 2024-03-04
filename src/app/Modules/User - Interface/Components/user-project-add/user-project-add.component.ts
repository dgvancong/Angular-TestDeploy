import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserInterfaceService } from '../../user-interface.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { formatDate } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-project-add',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NzAlertModule,
    NzSelectModule,
    NzDatePickerModule,
    NzModalModule
  ],
  templateUrl: './user-project-add.component.html',
  styleUrl: './user-project-add.component.scss'
})
export class UserProjectAddComponent implements OnInit {
  work = {
    projectName: '',
    projectKey: '',
    progress: 10,
    createdDate: '',
    endDate: '',
    projectDescription: '',
    clientContactName: '',
    clientContactEmail: '',
    clientContactPhone: '',
    teamID: '',
    userID: '',
  };
  dateFormat = 'yyyy-MM-dd';
  registrationSuccess = false;
  registrationError = false;
  users: any[] = [];
  teams: any[] = [];
  constructor(private userService: UserInterfaceService, private router: Router , private modal: NzModalService){}
  ngOnInit(): void {
    this.fetchUser();
    this.fetchTeams();
  }
  fetchUser() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
  fetchTeams() {
    this.userService.getTeams().subscribe(
      (response) => {
        this.teams = response;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
  projectadd() {
    const formattedCreatedDate = formatDate(this.work.createdDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.work.createdDate = formattedCreatedDate;
    this.work.endDate = formattedCreatedDate;
    this.userService.addProject(this.work).subscribe(
      (response) => {
        this.modal.success({
          nzTitle: 'Thành công',
          nzContent: 'Tạo dự án thành công',
        });
        setTimeout(() => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/user/project']);
        }, 1000);
      },
      (error) => {
        console.error('Error during project addition:', error);
        console.error('Server error message:', error.error);
        this.modal.error({
          nzTitle: 'Lỗi',
          nzContent: 'Tạo dự án thất bại',
        });
      }
    );
  }

}
