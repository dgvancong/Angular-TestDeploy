import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User_SidebarComponent } from './../../../../Layout/Components/User - Interface/sidebar/sidebar.component';
import { User_LayoutComponent } from './../../../../Layout/Components/User - Interface/layout/layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeadingComponent } from './../../../../Layout/Components/User - Interface/heading/heading.component';
import { UserWorkAvataComponent } from '../user-work-avata/user-work-avata.component';
import { UserWorkDrapdropComponent } from '../user-work-drapdrop/user-work-drapdrop.component';
import { UserInterfaceService } from '../../user-interface.service';

@Component({
  selector: 'app-user-work-summary',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    User_SidebarComponent,
    User_LayoutComponent,
    NzLayoutModule,
    HeadingComponent,
    UserWorkAvataComponent,
    UserWorkDrapdropComponent
  ],
  templateUrl: './user-work-summary.component.html',
  styleUrl: './user-work-summary.component.scss'
})
export class UserWorkSummaryComponent implements OnInit {
  projectID : any;
  projectData: any;

  constructor(private userService:UserInterfaceService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectID = params['id'];
      this.getProjectData();
    });
  }
  getProjectData() {
    if (this.projectID) {
      this.userService.getProjectById(this.projectID).subscribe(
        (data) => {
          this.projectData = data;
          console.log("Dự án của bạn",data);
        },
        (error) => {
          console.error('Lỗi khi lấy dự án theo ID:', error);
        }
      );
    } else {
      console.error('projectID không được định nghĩa. Không thể lấy dự án theo ID.');
    }
  }
}
