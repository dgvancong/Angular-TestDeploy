import { UserInterfaceService } from './../../user-interface.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { User_SidebarComponent } from './../../../../Layout/Components/User - Interface/sidebar/sidebar.component';
import { User_LayoutComponent } from './../../../../Layout/Components/User - Interface/layout/layout.component';
import { UserWorkAvataComponent } from '../user-work-avata/user-work-avata.component';
import { NgModel } from '@angular/forms';
import { HeadingComponent } from './../../../../Layout/Components/User - Interface/heading/heading.component';
import { UserWorkDrapdropComponent } from '../user-work-drapdrop/user-work-drapdrop.component';

@Component({
  selector: 'app-user-work',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NzIconModule,
    RouterModule,
    TabMenuModule,
    NzDropDownModule,
    ColorPickerModule,
    User_SidebarComponent,
    User_LayoutComponent,
    UserWorkAvataComponent,
    HeadingComponent,
    UserWorkDrapdropComponent

  ],
  templateUrl: './user-work.component.html',
  styleUrl: './user-work.component.scss'
})
export class UserWorkComponent implements OnInit {
  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#f0f0f0', '#333333', '#999999'];
  items: MenuItem[] | undefined;
  projectID : any;
  projectData: any;
  isVisible = false;
  constructor(private userService:UserInterfaceService, private route: ActivatedRoute, private router: Router){}
ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.projectID = params['id'];
  });
  }
}
