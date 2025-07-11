import { Component, OnInit } from '@angular/core';
import { ComponentService, ComponentItem } from '../component.service';
import { userService, userItem } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

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
    notification: '',
    compid: 1,
    reviewer_feedback: '',
  };

  constructor(private componentService: ComponentService, private userService: userService, private router: Router, private route: ActivatedRoute) { }

  name: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      const name1 = p.get('username');
      if (name1) {
        this.name = name1;
      }
    });
    this.loadUserComponents();
  }

  //Loads users from the user table
  loadUserComponents() {
    this.userService.getUserPassword(this.name).subscribe((data: userItem[]) => {
      this.component1 = data;
    });
  }

  //checks 
  isvalidurl(url: string): boolean {
    const pattern = /^(?:(git|ssh|https?):\/\/|git@)([\w.-]+)([:\/])([\w./-]+)(\/)?(\?[^\s#]*)?(#[^\s]*)?$/;
    return pattern.test(url);
  }

  //Adds new Components
  onSubmit() {
    this.route.paramMap.subscribe(p => {
      const name1 = p.get('username');
      if (name1) {
        this.newComponent.created_by = name1;
      }
    });
    if (!this.newComponent.name || !this.newComponent.description || !this.newComponent.url) {
      alert('Please fill required fields');
      this.router.navigate([`/upload/${this.name}`]);
    }
    else {
      if (!this.isvalidurl(this.newComponent.url)) {
        alert('Incorrect URL');
      } else {
        this.componentService.addComponent(this.newComponent).subscribe(() => {
          alert('Component uploaded Successfully!!');
          this.router.navigate([`/contributor/${this.name}`]);
        });
      }
    }
  }

  //Navigates back to contributor page
  goBack() {
    this.router.navigate([`/contributor/${this.name}`]);
  }
}
