import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDrawerModule} from 'ng-zorro-antd/drawer';
import { HttpClientModule } from '@angular/common/http';
import { UserInterfaceService } from '../../../../Modules/User - Interface/user-interface.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  selector: 'app-user-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone:true,
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
})
export class User_LayoutComponent implements OnInit {
  constructor( private route: ActivatedRoute ,private router: Router, private userService: UserInterfaceService , private modal: NzModalService){}
  userData: any;
  showEditor = false;
  users: any[] = [];
  teamID : any;
  teamData: any;
  projects: any[] = [];
  isVisible = false;
  visible = false;
  dateFormat = 'yyyy-MM-dd';
  projectId :any;
  projectData: any;

  task = {
    projectID: '',
    taskType: '',
    summary: '',
    userID: '',
    status: 'To Do',
    createdDate: '',
    endDate: '',
    priority: '',
    description: '',
    taskDescription: 'Create marketing materials for campaign',
    actualHoursSpent: '',
    taskManagerID: ''
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
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
    const userID = localStorage.getItem('userID');
    this.userService.getUserInfo(userID).subscribe(
      (data) => {
        this.userData = data.userLogin;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
    this.route.params.subscribe((params) => {
      this.teamID = +params['id'];
      this.userService.getProjectTeamID(this.teamID).subscribe(
        (data) => {
          this.teamData = data.projectTeam;
          console.log("Thành viên dự án :",this.teamData);
        },
        (error) => {
          console.error('Error fetching project team data:', error);
        }
      );
    });
    this.getProjectData();
    this.fetchProject();
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
    const formattedCreatedDate = formatDate(this.task.createdDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.task.createdDate = formattedCreatedDate;
    this.task.endDate = formattedCreatedDate;
    this.userService.addTask(this.task).subscribe(
      (response) => {
        this.modal.success({
          nzTitle: 'Thành công',
          nzContent: 'Tạo công việc thành công',
          nzOnOk: () => {
            window.location.reload();
          }
        });
      },
      (error) => {
        this.modal.error({
          nzTitle: 'Lỗi',
          nzContent: 'Tạo công việc thất bại',
        });
      }
    );
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
  fetchProject() {
    this.userService.getProejct().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
  getProjectData() {
    if (this.projectId) {
      this.userService.getProjectById(this.projectId).subscribe(
        (data) => {
          this.projectData = data;
        },
        (error) => {
          console.error('Lỗi khi lấy dự án theo ID:', error);
        }
      );
    } else {
      console.error('projectId không được định nghĩa. Không thể lấy dự án theo ID.');
    }
  }
}
