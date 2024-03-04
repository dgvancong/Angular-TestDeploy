import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User_LayoutComponent } from './../../../../Layout/Components/User - Interface/layout/layout.component';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserInterfaceService } from '../../user-interface.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Task } from './../../../../Share/User - Interface/taskList';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-project-views',
  standalone: true,
  imports: [
    CommonModule,
    User_LayoutComponent,
    RouterModule,
    NzTableModule,
    NzAlertModule,
    FormsModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    ProgressBarModule,
    ToastModule,
    NzMessageModule,
    NzModalModule,
    NzButtonModule,
    NzDatePickerModule,

  ],
  providers: [
    DatePipe,
  ],
  animations: [
    trigger('hideAnimation', [
      state('hidden', style({ opacity: 0, display: 'none' })),
      state('visible', style({ opacity: 1, display: 'block' })),
      transition('visible => hidden', animate('0.5s')),
      transition('hidden => visible', animate('0.5s'))
    ])
  ],
  templateUrl: './user-project-views.component.html',
  styleUrl: './user-project-views.component.scss'
})
export class UserProjectViewsComponent implements OnInit {
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
  projects: any[] = [];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Task[] = [];
  listOfData: readonly Task[] = [];
  setOfCheckedId = new Set<number>();
  constructor(private datePipe: DatePipe, private userService: UserInterfaceService,private message: NzMessageService, private modal: NzModalService){}
  ngOnInit(): void {
    this.getProejct();
  }
  public isLibraryHidden: boolean = false;
  public toggleLibrary() {
    this.isLibraryHidden = !this.isLibraryHidden;
  }
  createBasicMessage(): void {
    this.message.info('Lưu thông tin vào bộ tạm nhớ.');
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
  // Lấy danh sách dự án
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
    this.userService.DeleteProject(id).subscribe(
      (data: any) => {
        console.log(data);
        if (data.message === "Đã xóa dự án và chi tiết của dự án") {
          this.modal.success({
            nzTitle: 'Thành công',
            nzContent: 'Đã xóa dự án và chi tiết của dự án',
          });
        }
        this.getProejct();
      },
      (error) => {
        console.error(error);
        this.modal.error({
          nzTitle: 'Lỗi',
          nzContent: 'Xảy ra lỗi khi xóa dự án',
        });
      }
    );
  }
  // Sửa dự án
  isVisible = false;
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
      const projectID = this.selectedProject.projectID;
      this.editedProject.createdDate = this.datePipe.transform(this.editedProject.createdDate, 'yyyy-MM-dd');
      this.editedProject.endDate = this.datePipe.transform(this.editedProject.createdDate, 'yyyy-MM-dd');
      this.userService.updateProject(projectID, this.editedProject).subscribe(
        (data: any) => {
          console.log("Cập nhật thành công", data);
          this.modal.success({
            nzTitle: 'Thành công',
            nzContent: 'Cập nhật dự án thành công',
          });
          this.isVisible = false;
          this.getProejct();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}
