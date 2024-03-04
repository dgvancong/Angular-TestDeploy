import { Task } from './../../../../Share/User - Interface/taskList';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { UserWorkAvataComponent } from '../user-work-avata/user-work-avata.component';
import { UserWorkDrapdropComponent } from '../user-work-drapdrop/user-work-drapdrop.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserInterfaceService } from '../../user-interface.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SplitterModule } from 'primeng/splitter';
import { EditorModule } from 'primeng/editor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DatePipe } from '@angular/common';

import { User_SidebarComponent } from './../../../../Layout/Components/User - Interface/sidebar/sidebar.component';
import { User_LayoutComponent } from './../../../../Layout/Components/User - Interface/layout/layout.component';
import { HeadingComponent } from './../../../../Layout/Components/User - Interface/heading/heading.component';


@Component({
  selector: 'app-user-work-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    User_SidebarComponent,
    User_LayoutComponent,
    NzLayoutModule,
    HeadingComponent,
    UserWorkAvataComponent,
    UserWorkDrapdropComponent,
    NzAlertModule,
    FormsModule,
    NzTableModule,
    NzIconModule,
    NzModalModule,
    SplitterModule,
    EditorModule,
    NzMessageModule,
    NzInputModule,
    NzSelectModule,
    ProgressBarModule,
    ToastModule,
    NzButtonModule,
    NzDatePickerModule,
  ],
  providers: [
    DatePipe,
  ],
  templateUrl: './user-work-list.component.html',
  styleUrl: './user-work-list.component.scss'
})
export class UserWorkListComponent implements OnInit{
  checked = false;
  showEditor = false;
  text: string | undefined;
  indeterminate = false;
  listOfCurrentPageData: readonly Task[] = [];
  listOfData: readonly Task[] = [];
  setOfCheckedId = new Set<number>();
  projectId : any;
  projectData : any;
  isVisible = false;
  priorityMap: { [key: number]: string } = {
    1: 'Lowest',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Highest'
  };
  editedProject: any = {};
  selectedProject: any;
  showModal(selectedProject: any): void {
    console.log('showModal is called with selectedProject:', selectedProject);
    this.selectedProject = selectedProject;
      if (this.selectedProject) {
        setTimeout(() => {
          this.editedProject = { ...selectedProject };
          this.isVisible = true;
        }, 0);
      }
  }
  handleOk(): void {
    if (this.selectedProject) {
      const taskID = this.selectedProject.taskID;
      this.editedProject.createdDate = this.datePipe.transform(this.editedProject.createdDate, 'yyyy-MM-dd');
      this.editedProject.endDate = this.datePipe.transform(this.editedProject.createdDate, 'yyyy-MM-dd');
      this.userService.updateTask(taskID, this.editedProject).subscribe(
        (data: any) => {
          console.log("Cập nhật thành công", data);
          this.modal.success({
            nzTitle: 'Thành công',
            nzContent: 'Cập nhật công việc thành công',
          });
          this.isVisible = false;
          this.getTaskProjectData();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }
  onCurrentPageDataChange($event: readonly Task[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  constructor( private datePipe: DatePipe, private message: NzMessageService,private userService : UserInterfaceService, private router : Router, private route: ActivatedRoute, private modal: NzModalService ){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
    this.projectId = params['id'];
  });
  this.getTaskProjectData();
  }
  getTaskProjectData() {
    if (this.projectId) {
      this.userService.getTaskProjectById(this.projectId).subscribe(
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


  //Xóa dự án
  showDeleteConfirmationModal(id: any): void {
    if (id) {
      const nzOkType = 'danger' as any as 'default';
      this.modal.confirm({
        nzTitle: 'Bạn có chắc chắn muốn xóa dự án này không ?',
        nzOkText: 'Xóa',
        nzOkType,
        nzOnOk: () => this.deleteProject(id),
        nzCancelText: 'Hủy',
      });
    } else {
      console.error('Invalid projectId:', id);
    }
  }
  deleteProject(id: any): void {
    this.userService.DeleteTask(id).subscribe(
      (data: any) => {
        if (data.message === "Đã xóa công việc thành công") {
          this.modal.success({
            nzTitle: 'Thành công',
            nzContent: 'Đã xóa công việc thành công',
          });
        }
        setTimeout(() => {
          this.getTaskProjectData();
        }, 1000);
      },
      (error) => {
        console.error(error);
        this.modal.error({
          nzTitle: 'Lỗi',
          nzContent: 'Xảy ra lỗi khi xóa công việc',
        });
      }
    );
  }

}
