import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModel } from '@angular/forms';
import { User_SidebarComponent } from './../../../../Layout/Components/User - Interface/sidebar/sidebar.component';
import { User_LayoutComponent } from './../../../../Layout/Components/User - Interface/layout/layout.component';
import { HeadingComponent } from './../../../../Layout/Components/User - Interface/heading/heading.component';
import { UserWorkAvataComponent } from '../user-work-avata/user-work-avata.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-user-work-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    User_LayoutComponent,
    User_SidebarComponent,
    HeadingComponent,
    UserWorkAvataComponent,
    NzDropDownModule
  ],
  templateUrl: './user-work-settings.component.html',
  styleUrl: './user-work-settings.component.scss'
})
export class UserWorkSettingsComponent {

}
