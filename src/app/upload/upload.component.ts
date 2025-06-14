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
    notification:''
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

  loadUserComponents() {
    this.userService.getUserPassword(this.name).subscribe((data: userItem[]) => {
      this.component1 = data;
    });
  }

  isvalidurl(url: string): boolean {
    const pattern = /^(?:(git|ssh|https?):\/\/|git@)([\w.-]+)([:\/])([\w./-]+)(\/)?(\?[^\s#]*)?(#[^\s]*)?$/;
    return pattern.test(url);
  }

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
        // const email='{this.name}@gmail.com';
        // const email='manasavaidya@gmail.com';
        // window.location.href= 'mailto:${email}?Subject=ComponentUpload';
        // this.componentService.sendEmail(this.name).subscribe(()=>{
        //   console.log('email sent successfully!');
        // });
      }
    }
  }

  goBack() {
    this.router.navigate([`/contributor/${this.name}`]);
  }
}
