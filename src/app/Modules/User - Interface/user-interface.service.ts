import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {

  constructor(private http: HttpClient) { }

  // Phần Project
  private projectUrl = 'http://localhost:3000/project';

  getProejct(): Observable<any> {
    return this.http.get<any>(`${this.projectUrl}`);
  }

  getProjectById(projectID: any): Observable<any> {
    return this.http.get<any>(`${this.projectUrl}/get-project/` + projectID);
  }

  DeleteProject(projectID: any): Observable<any> {
    return this.http.delete<any>(`${this.projectUrl}/remove/` + projectID);
  }

  updateProject(projectID: string, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.projectUrl}/projects/${projectID}`, projectData);
  }

  addProject(work: any): Observable<any> {
    return this.http.post<any>(`${this.projectUrl}/add`, work);
  }

  // Phần User
  private apiUrl = 'http://localhost:3000/user';

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
  login(user: { emailAddress: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap((response) => {
        if (response.success && response.token && response.userID) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userID', response.userID);
        }
      })
    );
  }
  getUserInfo(userID:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/userLogin/${userID}`);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }

  // Phần Task
  private taskUrl = 'http://localhost:3000/task';

  getTask(): Observable<any> {
    return this.http.get<any>(`${this.taskUrl}`);
  }

  getTaskProjectById(projectID: any): Observable<any> {
    return this.http.get<any>(`${this.taskUrl}/tasks/` + projectID);
  }

  DeleteTask(taskID: any): Observable<any> {
    return this.http.delete<any>(`${this.taskUrl}/deletetask/` + taskID);
  }

  addTask(taskData: any): Observable<any> {
    return this.http.post<any>(`${this.taskUrl}/addtask`, taskData);
  }

  getTaskById(taskId: any): Observable<any> {
    return this.http.get<any>(`${this.taskUrl}/get-task-by-id/${taskId}`);
  }

  updateTask(taskId: string, taskData: any): Observable<any> {
    return this.http.put<any>(`${this.taskUrl}/updatetask/${taskId}`, taskData);
  }

  downloadExcel(): Observable<Blob> {
    return this.http.get(`${this.taskUrl}/api/downloadExcel`,{ responseType: 'blob' });
  }

  // team
  private teamUrl = 'http://localhost:3000/team';

  getTeams(): Observable<any> {
    return this.http.get<any>(`${this.teamUrl}`);
  }

  addTeammenber(teammenber: any): Observable<any> {
    return this.http.post<any>(`${this.teamUrl}/add_team_member`, teammenber);
  }

  getProjectTeamID(projectID: any): Observable<any> {
    return this.http.get(`${this.projectUrl}/projectteam/${projectID}`);
  }

  // Roles
  private rolesUrl = 'http://localhost:3000/roles';

  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.rolesUrl}`);
  }






  // Comment
  private commentUrl = 'http://localhost:3000/Comment';

  getComment(): Observable<any> {
    return this.http.get<any>(`${this.commentUrl}`);
  }












}
