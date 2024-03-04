import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { UserInterfaceService } from '../../../../Modules/User - Interface/user-interface.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NzIconModule,
    RouterModule,
    TabMenuModule,
    NzDropDownModule,
    ColorPickerModule
  ],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss'
})
export class HeadingComponent implements OnInit {
  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#f0f0f0', '#333333', '#999999'];
  items: MenuItem[] | undefined;
  projectId :any;
  projectData: any;
  isVisible = false;
  constructor(private userService:UserInterfaceService, private route: ActivatedRoute, private router: Router){}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.initializeItems();
    });
    this.getProjectData();
  }
  private initializeItems() {
    this.items = [
      { label: 'Tóm tắt', routerLink: `/user/work-summary/${this.projectId}`},
      { label: 'Bảng', routerLink: `/user/work/${this.projectId}`},
      { label: 'Danh Sách', routerLink: `/user/work-list/${this.projectId}`},
      { label: 'Lịch', routerLink: `/user/work-calendar/${this.projectId}`},
      { label: 'Mốc Thời Gian', routerLink: `/user/work-timline/${this.projectId}`},
      { label: 'Hình Thức', routerLink: `/user/work-forms/${this.projectId}`},
      { label: 'Trang', routerLink: `/user/work-pages/${this.projectId}`},
      { label: 'Vấn Đề', routerLink: `/user/work-issues/${this.projectId}` },
      { label: 'Báo Cáo', routerLink: `/user/work-reports/${this.projectId}` },
      { label: 'Phím Tắt', routerLink: `/user/work-shortcuts/${this.projectId}`},
      { label: 'Cài Đặt', routerLink: `/user/work-settings/${this.projectId}`}
    ];
  }
  getProjectData() {
    if (this.projectId) {
      this.userService.getProjectById(this.projectId).subscribe(
        (data) => {
          this.projectData = data;
          console.log("Dự án của bạn", data);
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
