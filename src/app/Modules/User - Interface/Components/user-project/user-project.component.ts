import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User_LayoutComponent } from './../../../../Layout/Components/User - Interface/layout/layout.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserInterfaceService } from '../../user-interface.service';
import { ActivatedRoute } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserWorkReportsComponent } from '../user-work-reports/user-work-reports.component';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrl: './user-project.component.scss',
  standalone: true,
  imports:[
    CommonModule,
    RouterModule,
    User_LayoutComponent,
    NzTabsModule,
    NzEmptyModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NzTableModule,
    NzIconModule,
    UserWorkReportsComponent
  ]
})
export class UserProjectComponent implements OnInit {
  projects: any[] = [];
  tasks: any[] = [];
  tabs = ['Làm việc trên', 'Đã xem', 'Giao cho tôi', 'Được gắn sao'];
  project: any;

  getTabData(tab: string): string[] {
    switch (tab) {
      case 'Làm việc trên':
        return [];
      case 'Đã xem':
        return [];
      case 'Giao cho tôi':
        return ['Hiện chưa có công việc hiện tại của bạn !'];
      case 'Được gắn sao':
        return [ 'Chưa có dự án nổi bật nào được gắn sao cả =))'];
      default:
        return [];
    }
  }
  sortAgeFn = (a: any, b: any): number => a.projectName - b.projectName;
  constructor(private userService: UserInterfaceService, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.getProejct();
    this.getTask();
  }
  getProjectById(id: any): void {
    this.userService.getProjectById(id).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getProejct(): void {
    this.userService.getProejct().subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  getTask(): void {
    this.userService.getTask().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}
