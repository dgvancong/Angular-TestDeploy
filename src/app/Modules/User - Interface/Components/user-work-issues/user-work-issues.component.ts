import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User_SidebarComponent } from './../../../../Layout/Components/User - Interface/sidebar/sidebar.component';
import { User_LayoutComponent } from './../../../../Layout/Components/User - Interface/layout/layout.component';
import { HeadingComponent } from './../../../../Layout/Components/User - Interface/heading/heading.component';
import { UserWorkAvataComponent } from '../user-work-avata/user-work-avata.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-user-work-issues',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    User_LayoutComponent,
    User_SidebarComponent,
    HeadingComponent,
    UserWorkAvataComponent,
    NzEmptyModule
  ],
  templateUrl: './user-work-issues.component.html',
  styleUrl: './user-work-issues.component.scss'
})
export class UserWorkIssuesComponent {

}
