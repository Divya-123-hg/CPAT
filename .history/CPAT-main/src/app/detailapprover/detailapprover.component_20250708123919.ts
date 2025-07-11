
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService, ComponentItem } from '../component.service';
import { userItem, userService } from '../user.service';

@Component({
  selector: 'app-detailapprover',
  standalone: false,
  templateUrl: './detailapprover.component.html',
  styleUrl: './detailapprover.component.css'
})
export class DetailapproverComponent implements OnInit {

  component: ComponentItem[] = [];

  component1: userItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private componentService: ComponentService,
    private userService: userService,
  ) { }
  name: string = '';
  id:number=1;
  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const id = p.get('id');
      const name = p.get('username');
      if (name) {
        this.name = name;
      }
      if (id) {
        this.id=id;
        this.componentService.getComponentById(id).subscribe(data =>
          this.component = [data]);
      }
    });
  }

  update(id: number, status: string) {
    this.componentService.updateStatus(id, status, this.name).subscribe(() => {
      this.route.paramMap.subscribe(p => {
        const username = p.get('username');
        if (username) {
          this.router.navigate([`/approver/${username}`]);
        }
      });
    })
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

  submitComment(feedback: string, id: number) {

    this.componentService.giveApproverFeedback(id, feedback).subscribe(() => {
      this.route.paramMap.subscribe(p => {
        const username = p.get('username');
        if (username) {
          this.router.navigate([`/approver/${username}`]);
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

  goBack() {
    this.route.paramMap.subscribe(p => {
      const username = p.get('username');
      if (username) {
        this.router.navigate([`/approver/${username}`]);
      }
    });
  }

  toSentenceCase(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
  }

  moreInfo(){
    this.componentService.moreInfo(this.id).subscribe(()=>{

    })
  }


}