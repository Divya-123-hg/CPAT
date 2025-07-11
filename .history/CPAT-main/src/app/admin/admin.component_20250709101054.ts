import { Component } from '@angular/core';
import { userService, userItem } from '../user.service';
import { Router } from '@angular/router';
import { ComponentItem, ComponentService } from '../component.service';

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

  constructor(private router: Router, private userService: userService, private componentService: ComponentService) { }

  AdminPage = true;
  showLogin = false;
  showAdmin = true;
  Ausername = '';
  Apassword = '';

  ngOnInit() {
    this.loadUserComponents();
  }

  //Checks Admin Authentication
  adminLogin() {
    if (this.Ausername === 'Admin' && this.Apassword === 'super') {
      this.AdminPage = true;
      this.showAdmin = false;
    }
  }

  //Closes Add user Pop-up
  onback() {
    this.showLogin = false;
    this.component.username = '';
    this.component.password = '';
    this.component.role = '';
  }

  //loads User Components
  loadUserComponents() {
    this.userService.getUsersWithRoles().subscribe((data: userItem[]) => {
      this.component1 = data;
    });
  }

  //Adds users pop-up
  addUser() {
    this.showLogin = true;
  }

  //Checks for Password strength while assigning the passwords to users
  isStrongPassword(password: string) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return pattern.test(password);
  }

  //Adds Users
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
  
  //Deletes the Users
  deleteUser(name: string) {
    this.userService.deleteUser(name).subscribe(() => {
      this.loadUserComponents();
    });
  }
 
  components: ComponentItem[] = [];
  showComponents:boolean=false;
  users:boolean=true;

  //Loads all the Components on admin page
  loadComponents() {
    this.users=false;
    this.showComponents=true;
    this.componentService.getComponentsAdmin().subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

  //Makes the 
  toSentenceCase(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
  }

  back(){
    this.users=true;
    this.showComponents=false;
  }
}
