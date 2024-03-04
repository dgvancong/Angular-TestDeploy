import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { UserSignupComponent } from './Components/user-signup/user-signup.component';
import { UserProjectComponent } from './Components/user-project/user-project.component';
import { UserProjectAddComponent } from './Components/user-project-add/user-project-add.component';
import { UserProjectListComponent } from './Components/user-project-list/user-project-list.component';
import { UserProjectViewsComponent } from './Components/user-project-views/user-project-views.component';
import { UserWorkComponent } from './Components/user-work/user-work.component';
import { UserWorkCalendarComponent } from './Components/user-work-calendar/user-work-calendar.component';
import { UserWorkFormsComponent } from './Components/user-work-forms/user-work-forms.component';
import { UserWorkIssuesComponent } from './Components/user-work-issues/user-work-issues.component';
import { UserWorkListComponent } from './Components/user-work-list/user-work-list.component';
import { UserWorkPagesComponent } from './Components/user-work-pages/user-work-pages.component';
import { UserWorkReportsComponent } from './Components/user-work-reports/user-work-reports.component';
import { UserWorkSettingsComponent } from './Components/user-work-settings/user-work-settings.component';
import { UserWorkShortcutsComponent } from './Components/user-work-shortcuts/user-work-shortcuts.component';
import { UserWorkSummaryComponent } from './Components/user-work-summary/user-work-summary.component';
import { UserWorkTimlineComponent } from './Components/user-work-timline/user-work-timline.component';
import { IntroHomeComponent } from './Components/intro-home/intro-home.component';
import { WelcomeHomeComponent } from './Components/welcome-home/welcome-home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


const userRoutes: Routes = [
  { path: '', redirectTo: 'intro-home', pathMatch: 'full' },

  { path: 'intro-home', component: IntroHomeComponent },

  { path: 'welcome-home', component: WelcomeHomeComponent },

  { path: 'doashboard-home', component: DashboardComponent },

  { path: 'login', component: UserLoginComponent },

  { path: 'signup', component: UserSignupComponent },

  { path: 'project', component: UserProjectComponent },

  { path: 'project-views', component: UserProjectViewsComponent },

  { path: 'project-list', component: UserProjectListComponent },

  { path: 'project-add', component: UserProjectAddComponent },

  { path: 'work/:id', component: UserWorkComponent },

  { path: 'work-calendar/:id', component: UserWorkCalendarComponent },

  { path: 'work-forms/:id', component: UserWorkFormsComponent },

  { path: 'work-issues/:id', component: UserWorkIssuesComponent },

  { path: 'work-list/:id', component: UserWorkListComponent },

  { path: 'work-pages/:id', component: UserWorkPagesComponent },

  { path: 'work-reports/:id', component: UserWorkReportsComponent },

  { path: 'work-settings/:id', component: UserWorkSettingsComponent },

  { path: 'work-shortcuts/:id', component: UserWorkShortcutsComponent },

  { path: 'work-summary/:id', component: UserWorkSummaryComponent },

  { path: 'work-timline/:id', component: UserWorkTimlineComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class UserInterfaceModule { }
