// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { Component } from "@angular/core";

@Component({
  selector:'app-contributor',
  templateUrl:'./contributor.component.html',
  styleUrls:['./contributor.component.css'],
  standalone:false
})

export class ContributorComponent {
  components = [
    {id :1 ,name : 'Login Form', description:'Reusable login form', url:'https://example.com/login'},
    {id :2 ,name : 'Navbar', description:'Responsive navbar', url:'https://example.com/navbar'},
  ];

  constructor(){}
}
