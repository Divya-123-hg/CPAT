import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService, userItem } from '../user.service';
import { ComponentService, ComponentItem } from '../component.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  standalone: false,
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {

  component: ComponentItem[] = [];

  component1: userItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private componentService: ComponentService,
    private userService: userService,
  ) { }
name:string='';
status:string='';
  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const id = p.get('id');
      const name = p.get('username');
      if(name){
        this.name=name;
      }
      if (id) {
        this.componentService.getComponentById(id).subscribe(data =>
          this.component = [data]);
      }
    });
  }

  update(id: number, status: string) {
    this.componentService.updateStatus(id, status,this.name).subscribe(() => { });
    this.route.paramMap.subscribe(p => {
      const username = p.get('username');
      if (username) {
        this.router.navigate([`/reviewer/${username}`]);
      }
    });
  }

  isOpen: boolean = false;
  comment: string = '';

  openPopup() {
    this.isOpen = true;
  }

  closePopup() {
    this.isOpen = false;
    this.comment = '';
  }
  //reviewed_by:string='';
  submitComment(comment: string, id: number) {
    console.log(comment);
    this.componentService.giveFeedback(id, comment).subscribe(() => {
      this.route.paramMap.subscribe(p => {
        const username = p.get('username');
        if (username) {
          this.router.navigate([`/reviewer/${username}`]);
          // this.component.reviewed_by=username;
        }
      });
    })

    if (this.comment.trim()) {
      console.log("submitted comment", this.comment);
      this.closePopup();
    } else {
      alert("comment cannot be empty!!")
    }
  }

}