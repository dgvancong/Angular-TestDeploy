import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-intro-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './intro-home.component.html',
  styleUrl: './intro-home.component.scss'
})
export class IntroHomeComponent {

}
