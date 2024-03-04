import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeadingComponent } from './../../../../Layout/Components/User - Interface/heading/heading.component';
import { User_LayoutComponent } from './../../../../Layout/Components/User - Interface/layout/layout.component';
import { User_SidebarComponent } from './../../../../Layout/Components/User - Interface/sidebar/sidebar.component';
import { UserWorkAvataComponent } from '../user-work-avata/user-work-avata.component';
import { UserInterfaceService } from '../../user-interface.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SplitterModule } from 'primeng/splitter';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DatePipe } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-work-drapdrop',
  standalone: true,
  imports: [
    RouterModule,
    HeadingComponent,
    UserWorkAvataComponent,
    User_LayoutComponent,
    User_SidebarComponent,
    CommonModule,
    NzIconModule,
    NzDropDownModule,
    NzModalModule,
    SplitterModule,
    EditorModule,
    NzTableModule,
    FormsModule

  ],
  providers: [
    DatePipe,
  ],
  templateUrl: './user-work-drapdrop.component.html',
  styleUrl: './user-work-drapdrop.component.scss'
})
export class UserWorkDrapdropComponent implements OnInit {
  showInput: boolean = false;
  newTaskName: string = '';
  tasks: any[] = [];
  currentItem : any;
  isVisible = false;
  showEditor = false;
  text: string | undefined;
  projectID : any;
  projectData: any;
  projectId : any;
  priorityMap: { [key: number]: string } = {
    1: 'Lowest',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Highest'
  };
  constructor(private datePipe: DatePipe,private router: Router, private userService : UserInterfaceService, private route : ActivatedRoute , private modal: NzModalService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectID = params['id'];
      this.userService.getTaskProjectById(this.projectID).subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Có lỗi khi gọi API:', error);
        }
      );
    });
  }
  createNewTask() {
    if (this.newTaskName.trim() !== '') {
      console.log('Creating new task:', this.newTaskName);
      this.newTaskName = '';
    }
  }
  filterTickets(status: string) {
    return this.tasks.filter((task) => task.status === status);
  }
  onDragStart(item: any) {
    this.currentItem = item;
    console.log('Current Item:', this.currentItem);
  }

  onDrop(event: any, status: string) {
    event.preventDefault();
    if (!this.currentItem || !this.currentItem.taskID) {
      console.error('Không có công việc hoặc taskId không hợp lệ.');
      return;
    }
    const taskId = this.currentItem.taskID;
    this.userService.updateTask(taskId, status).subscribe(
      (data) => {
        console.log('API Response:', data);
        const updatedTask = this.tasks.find((task) => task.taskID === taskId);
        if (updatedTask) {
          updatedTask.status = status;
          console.log('Cập nhật trạng thái công việc thành công:', data);
        }
      },
      (error) => {
        console.error('Có lỗi khi cập nhật trạng thái công việc:', error);
      }
    );

    this.currentItem = null;
  }


  onDrapOver(event : any){
    event.preventDefault();
  }
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
  handleCancel(): void {
    this.isVisible = false;
  }
}
