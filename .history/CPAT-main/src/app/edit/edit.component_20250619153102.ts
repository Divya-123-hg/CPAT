import { Component, OnInit } from '@angular/core';
import { ComponentService, ComponentItem } from '../component.service';
import { userService, userItem } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  component1: userItem[] = [];

  newComponent: ComponentItem = {
    id: 1,
    name: '',
    description: '',
    url: '',
    created_at: '',
    created_by: '',
    reviewed_at: 1,
    reviewed_by: '',
    reviewer_description: '',
    approved_at: '',
    approved_by: '',
    approver_feedback: '',
    reviewer_status: '',
    approver_status: '',
    status: '',
    notification:''
  };

  constructor(private componentService: ComponentService, private userService: userService, private router: Router, private route: ActivatedRoute) { }

  name: string = '';
  newid:number=1;

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      const name1 = p.get('username');
      // const id1=Number(p.get('id'));
      const id1=p.get('id');
      if (name1 && id1) {
        this.name = name1;
        this.newid=(id1);
      }
      if (id1) {
        this.componentService.getComponentById(id1).subscribe(data =>
          this.component = [data]);
      }
    });
    this.loadUserComponents();
  }

  loadUserComponents() {
    this.userService.getUserPassword(this.name).subscribe((data: userItem[]) => {
      this.component1 = data;
    });
  }

  isvalidurl(url: string): boolean {
    const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?(\?[^\s#]*)?(#[^\s]*)?$/;
    return pattern.test(url);
  }

  onSubmit() {
    if (!this.newComponent.name || !this.newComponent.description || !this.newComponent.url) {
      alert('Please fill required fields');
      this.router.navigate([`/upload/${this.name}`]);
    }
    else {
      if (!this.isvalidurl(this.newComponent.url)) {
        alert('Incorrect URL');
      } else {
        this.newComponent.id=this.newid;
        this.newComponent.created_by=this.name;
        this.componentService.updateComponent(this.newComponent).subscribe(() => {
          // console.log(this.newComponent);
          alert('Component edited Successfully!!');
          this.router.navigate([`/contributor/${this.name}`]);
        });
      }
    }
  }

  goBack() {
    this.router.navigate([`/contributor/${this.name}`]);
  }
}
