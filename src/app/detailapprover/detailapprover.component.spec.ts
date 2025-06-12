import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailapproverComponent } from './detailapprover.component';

describe('DetailapproverComponent', () => {
  let component: DetailapproverComponent;
  let fixture: ComponentFixture<DetailapproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailapproverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailapproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
