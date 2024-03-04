import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-project-list',
  templateUrl: './user-project-list.component.html',
  styleUrl: './user-project-list.component.scss',
  standalone:true,
  imports:[
    RouterModule
  ]
})
export class UserProjectListComponent {

}
