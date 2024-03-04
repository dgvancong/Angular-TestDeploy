import { Component, OnInit } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


import { UserInterfaceService } from '../../user-interface.service';
import { ActivatedRoute } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { formatDate } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzInputModule } from 'ng-zorro-antd/input';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-user-work-avata',
  standalone: true,
  imports: [
    NzAvatarModule,
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NzModalModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NzAlertModule,
    NzInputModule

  ],
  templateUrl: './user-work-avata.component.html',
  styleUrl: './user-work-avata.component.scss'
})
export class UserWorkAvataComponent implements OnInit {
  teammenber = {
    teamID: '',
    userID: '',
    joinDate: ''
  };
  teamID : any;
  teamData: any;
  isVisible = false;
  users: any[] = [];
  teams: any[] = [];
  roles: any[] = [];
  dateFormat = 'yyyy-MM-dd';
  constructor(private userService:UserInterfaceService, private route: ActivatedRoute, private modal: NzModalService, private router: Router){}
  ngOnInit(): void {
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
    this.fetchUser();
    this.fetchTeams();
  }
  getRoleName(roleID: any): string {
    const role = this.roles.find(r => r.roleID === roleID);
    return role ? role.roleName : '';
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
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
    const formattedCreatedDate = formatDate(this.teammenber.joinDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.teammenber.joinDate = formattedCreatedDate;
    this.userService.addTeammenber(this.teammenber).subscribe(
      (response) => {
        this.modal.success({
          nzTitle: 'Thành công',
          nzContent: 'Đã thêm thành viên vào dự án thành công',
          nzOnOk: () => {
            window.location.reload();
          }
        });
        this.teamData = response.projectTeam;
      },
      (error) => {
        this.modal.error({
          nzTitle: 'Lỗi',
          nzContent: 'Xảy ra lỗi khi thêm thành viên vào dự án',
        });
      }
    );
  }
  handleCancel(): void {
    this.isVisible = false;
  }


  downloadExcel(): void {
    this.userService.downloadExcel().subscribe((data: Blob) => {
      saveAs(data, 'congviec-data.xlsx');
    });
  }

}
