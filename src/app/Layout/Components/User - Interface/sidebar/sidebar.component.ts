import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserInterfaceService } from '../../../../Modules/User - Interface/user-interface.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone:true,
  imports:[
    RouterModule,
    NzInputModule,
    CommonModule,
    NzMenuModule,
    NzToolTipModule,
    NzTypographyModule,
    NzLayoutModule,
    NzIconModule
  ]
})
export class User_SidebarComponent implements OnInit {
  isCollapsed: boolean = false;
  projects: any[] = [];
 constructor(private userService : UserInterfaceService){}
 ngOnInit(): void {
   this.getProejct();
 }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
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

}
