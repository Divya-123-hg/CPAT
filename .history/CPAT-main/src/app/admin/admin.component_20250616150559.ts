import { Component } from '@angular/core';
import { userService, userItem } from '../user.service';
import { Router } from '@angular/router';

@Component({                      //This is a decorator that tells Angular that the class it's attached to is a component, it provides metadata about how the component should behave.
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  component: userItem = {
    id: 1,
    role: '',
    username: '',
    password: '',
  }

  component1: userItem[] = [];

  constructor(private router: Router, private userService: userService) { }

  AdminPage = true;
  showLogin = false;
  showAdmin = true;
  Ausername = '';
  Apassword = '';

  ngOnInit() {
    this.loadUserComponents();
  }

  adminLogin() {
    if (this.Ausername === 'Admin' && this.Apassword === 'super') {
      this.AdminPage = true;
      this.showAdmin = false;
    }
  }

  onback() {
    this.showLogin = false;
    this.component.username = '';
    this.component.password = '';
    this.component.role = '';
  }

  loadUserComponents() {
    this.userService.getUsersWithRoles().subscribe((data: userItem[]) => {
      this.component1 = data;
    });
  }

  addUser() {
    this.showLogin = true;

  }

  isStrongPassword(password: string) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return pattern.test(password);
  }

  onSubmit() {
    if (!this.component.username || !this.component.password || !this.component.role) {
      alert('Please fill all required fields');
      this.router.navigate(['/admin']);
    }
    else {
      if (this.isStrongPassword(this.component.password)) {
        this.userService.addComponent(this.component).subscribe(() => {
          alert('User Added Successfully!!');
          this.showLogin = false;
          this.router.navigate(['/admin']);
          this.component.username = '';
          this.component.password = '';
          this.component.role = '';
        });
      } else {
        alert(
          "🔒 Password Requirements:\n\n" +
          "• At least 12 characters long\n" +
          "• At least one uppercase letter (A–Z)\n" +
          "• At least one lowercase letter (a–z)\n" +
          "• At least one number (0–9)\n" +
          "• At least one special character: @, $, !, %, *, ?, &\n\n" +
          "Only these characters are allowed. Please try again."
        );
        this.component.password = '';
      }
    }
  }

  delete(name: string) {
    this.userService.deleteUser(name).subscribe(() => {
      // this.loadComponents(this.table);
    });
  }

}
