import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerComponent } from './reviewer.component';

describe('ReviewerComponent', () => {
  let component: ReviewerComponent;
  let fixture: ComponentFixture<ReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class reviewerComponent {
  components = [
    {id :1 ,name : 'Login Form', description:'Reusable login form', url:'https://example.com/login'},
    {id :2 ,name : 'Navbar', description:'Responsive navbar', url:'https://example.com/navbar'},
  ];

  constructor(){}
}
