import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User_SidebarComponent } from './../../../../Layout/Components/User - Interface/sidebar/sidebar.component';
import { User_LayoutComponent } from './../../../../Layout/Components/User - Interface/layout/layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeadingComponent } from './../../../../Layout/Components/User - Interface/heading/heading.component';
import { UserWorkAvataComponent } from '../user-work-avata/user-work-avata.component';
import { UserWorkDrapdropComponent } from '../user-work-drapdrop/user-work-drapdrop.component';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-user-work-timline',
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
    NzCalendarModule

  ],
  templateUrl: './user-work-timline.component.html',
  styleUrl: './user-work-timline.component.scss'
})
export class UserWorkTimlineComponent {
  date = new Date(2012, 11, 21);
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
