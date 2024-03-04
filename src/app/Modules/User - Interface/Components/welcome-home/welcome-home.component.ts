import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './welcome-home.component.html',
  styleUrl: './welcome-home.component.scss'
})
export class WelcomeHomeComponent {

}
