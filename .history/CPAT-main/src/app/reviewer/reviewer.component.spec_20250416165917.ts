import { Component } from "@angular/core";

@Component({
  selector:'app-reviewer',
  templateUrl:'./reviewer.component.html',
  styleUrls:['./reviewer.component.css'],
  standalone:false
})

export class reviewerComponent {
  components = [
    {id :1 ,name : 'Login Form', description:'Reusable login form', url:'https://example.com/login'},
    {id :2 ,name : 'Navbar', description:'Responsive navbar', url:'https://example.com/navbar'},
  ];

  constructor(){}
}
