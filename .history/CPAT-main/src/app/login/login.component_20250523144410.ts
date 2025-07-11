// import { Component, OnInit} from '@angular/core';
// import { userItem, userService } from '../user.service';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   standalone: false,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent{

//   constructor(private router: Router, private userService: userService, private http: HttpClient) { }
  
//   components: userItem[] = [];

//   showLogin = true;
//   username:string = '';
//   password:string = '';

//   closeLogin() {
//     this.showLogin = false;
//     this.router.navigate(['/homepage']);
//   }

//   p: string = '';
//   user: string = '';
//   role: string = '';

//   checkLogin(username: string) {
//     this.userService.getUserPassword(username).subscribe((data: userItem[]) => {
      
//       this.p = data[0].password;
//       this.user = data[0].username;
//       this.role = data[0].role;

//       console.log(this.role, '(db)');//DB

//       console.log(this.p, '(db)');//DB
//       console.log(this.password);

//       console.log(this.username,'(username)');
//       console.log(this.user, '(db)');//DB

//       if (this.p === this.password) {

//         this.router.navigate([`${this.role}/${this.username}`]);

//           // localStorage.setItem('authenticated','true');

//       } else {
//         console.log('wrong credentials');//DB
//         alert('invalid credentials');
//         this.router.navigate(['/homepage']);
//       }
//     });
//   }

// }
