import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userItem, userService } from '../user.service';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private router: Router, private userService: userService, private http: HttpClient) { }

  components: userItem[] = [];

  showAdmin = false;
  showLogin = true;
  Admin_username = '';
  Admin_password = '';
  username: string = '';
  password: string = '';
  p: string = '';
  user: string = '';
  role: string = '';

  GoToAdmin() {
    if (this.Admin_username === 'Admin' && this.Admin_password === 'super') {
      this.router.navigate(['/admin']);
    }
  }

  popUp() {
    this.showAdmin = true;
    this.showLogin=false;
  }

  popUpClose() {
    this.showAdmin = false;
  }

  openLogin(){
    this.showLogin=true;
    this.showAdmin = false;
  }

  closeLogin() {
    this.showLogin = false;
  }

  checkLogin(username: string) {
    this.userService.getUserPassword(username).subscribe((data: userItem[]) => {

      this.p = data[0].password;
      this.user = data[0].username;
      this.role = data[0].role;

      console.log(this.role, '(db)');//DB

      console.log(this.p, '(db)');//DB
      console.log(this.password);

      console.log(this.username, '(username)');
      console.log(this.user, '(db)');//DB

      if (this.p === this.password) {

        this.router.navigate([`${this.role}/${this.username}`]);

        // localStorage.setItem('authenticated','true');

      } else {
        console.log('wrong credentials');//DB
        alert('invalid credentials');
        this.router.navigate(['/homepage']);
      }
    });
  }

}
