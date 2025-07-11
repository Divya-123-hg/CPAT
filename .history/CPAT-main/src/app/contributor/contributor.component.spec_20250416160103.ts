import { Component } from "@angular/core";

@Component({
  selector:'app-contributor',
  templateUrl:'./contributor.component.html',
  styleUrls:['./contributor.component.css'],
  standalone:false
})

export class ContributorComponent {
  components = [
    // {id :1 ,name : 'Login Form', description:'Reusable login form', url:'https://example.com/login'},
    // {id :2 ,name : 'Navbar', description:'Responsive navbar', url:'https://example.com/navbar'},
  ];

  constructor(){}
}
