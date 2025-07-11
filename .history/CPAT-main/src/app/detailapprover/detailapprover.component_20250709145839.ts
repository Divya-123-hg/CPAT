
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
        this.id=Number(id);
        this.componentService.getComponentById(id).subscribe(data =>
          this.component = [data]);
      }
    });
  }

  //Status update based on approver action
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

  //Approver feedback or requests
  submitComment(feedback: string, id: number) {
    this.componentService.giveApproverFeedback(id, feedback).subscribe(() => {
      this.route.paramMap.subscribe(p => {
        const username = p.get('username');
        if (username) {
          this.router.navigate([`/approver/${username}`]);
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

  //Navigate back to approver page
  goBack() {
    this.route.paramMap.subscribe(p => {
      const username = p.get('username');
      if (username) {
        this.router.navigate([`/approver/${username}`]);
      }
    });
  }

  //Makes the first letter capital
  toSentenceCase(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
  }

  //sets the status as more information required
  moreInfo(){
    this.componentService.moreInfo(this.id, this.).subscribe(()=>{
      this.router.navigate([`/approver/${this.name}`]);
    })
  }


}