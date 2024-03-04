import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDrawerModule} from 'ng-zorro-antd/drawer';
import { HttpClientModule } from '@angular/common/http';
import { UserInterfaceService } from '../../../../Modules/user-face/user-interface.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SplitterModule } from 'primeng/splitter';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { formatDate } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-work-add',
  standalone: true,
  imports: [
    NzDropDownModule,
    NzDrawerModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ButtonModule,
    EditorModule,
    FormsModule,
    NzTableModule,
    SplitterModule,
    NzIconModule,
    NzModalModule,
    NzTabsModule,
    ReactiveFormsModule,
    NzAlertModule,
    NzSelectModule,
    NzDatePickerModule,
  ],
  templateUrl: './user-work-add.component.html',
  styleUrl: './user-work-add.component.scss'
})
export class UserWorkAddComponent implements OnInit {
  constructor(private router: Router, private userService: UserInterfaceService , private modal: NzModalService){}
  userData: any;
  showEditor = false;
  text: string | undefined;
  task = {
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


  logout() {
    this.userService.logout();
    this.router.navigate(['user/login']);
  }
  openDrawer(): void {
    this.visible = true;
  }

  closDrawer(): void {
    this.visible = false;
  }
  ngOnInit(): void {
    const userID = localStorage.getItem('userID');
    this.userService.getUserInfo(userID).subscribe(
      (data) => {
        this.userData = data.userLogin;
        console.log("Lịch sử đăng nhập người dùng :",this.userData);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  dateFormat = 'yyyy-MM-dd';
  projectadd() {
    const formattedCreatedDate = formatDate(this.task.createdDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.task.createdDate = formattedCreatedDate;
    this.task.endDate = formattedCreatedDate;
    this.userService.addTask(this.task).subscribe(
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
  isVisible = false;
  visible = false;
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }
}
