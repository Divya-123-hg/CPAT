import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface ComponentItem {
  id: number;
  name: string;
  description: string;
  url: string;
  created_at: string;
  created_by: string;
  reviewed_at: number;
  reviewed_by: string;
  reviewer_description: string;
  approved_at: string;
  approved_by: string;
  approver_feedback: string;
  approver_status: string;
  reviewer_status: string;
  status: string;
  notification: string;
  compid:number;
  reviewer_feedback:string;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  private apiUrl = 'http://localhost:3000/api/components';

  constructor(private http: HttpClient) { }

  //Adds new component
  addComponent(component: ComponentItem): Observable<any> {
    return this.http.post(this.apiUrl, component);
  }
  
  //Fetch all the components
  getComponents(table: string, username:string): Observable<ComponentItem[]> {
    return this.http.get<ComponentItem[]>(`${this.apiUrl}/table/${table}/${username}`);
  }

  //Fetches Components by id
  getComponentById(id: string): Observable<ComponentItem> {
    return this.http.get<ComponentItem>(`${this.apiUrl}/id/${id}`);
  }

  //Fetches Components by status
  getComponentsByStatus(selected: string, name: string): Observable<ComponentItem[]> {
    return this.http.get<ComponentItem[]>(`${this.apiUrl}/${selected}/${name}`);
  }

  //Updates status based on approver and reviewer actions
  updateStatus(id: number, status: string, name: string) {
    return this.http.post(`${this.apiUrl}/${status}`, { id, name });
  }

  //Fetches Components by name
  getComponentsByText(searchText: string, name: string): Observable<ComponentItem[]> {
    return this.http.get<ComponentItem[]>(`${this.apiUrl}/searchText/searchText/${searchText}/${name}`);
  }

  //sets reviewer feedback
  giveFeedback(id: number, comment: string) {
    return this.http.post(`${this.apiUrl}/comment/comment/comment/${comment}`, { id });
  }

  //sets approver feedback
  giveApproverFeedback(id: number, feedback: string) {
    return this.http.post(`${this.apiUrl}/feedback/feedback/feedback/feedback/${feedback}`, { id });
  }

  //Deletes components by id
  deleteComponentById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${id}`);
  }

  //Updates the component
  updateComponent(component: ComponentItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/id/id/id/id/id`,component);
  }

  //Fetches the notifications
  getNotifications(name:string, table:string):Observable<any>{
    return this.http.get<ComponentItem[]>(`${this.apiUrl}/a/a/a/a/a/a/a/a/a/a/a/a/a/${name}/${table}`);
  }
 
  //Deletes the notifications
  deleteNotification(id: number, table: string):Observable<any> {
    console.log(id);
    return this.http.post(`${this.apiUrl}/put/a/a/a/a/a/a/a/a/a/a/a/a/notification`,{id, table});
  }

  
  getComponentsAdmin():Observable<ComponentItem[]>{
    return this.http.get<ComponentItem[]>(`${this.apiUrl}`);
  }

  getComponentHistory(id:string):Observable<any>{
    return this.http.get<ComponentItem[]>(`${this.apiUrl}/id/${id}/${id}`)
  }

  moreInfo(id:number){
    return this.http.post(`${this.apiUrl}/info/info/${id}/id/${id}`,{id});
  }

}
