import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-popup',
  standalone: false,
  templateUrl: './comment-popup.component.html',
  styleUrl: './comment-popup.component.css'
})
export class CommentPopupComponent {

  isOpen:boolean=false;
  comment:string='';

  openPopup(){
    this.isOpen=true;
  }

  closePopup(){
    this.isOpen=false;
    this.comment='';
  }

  submitComment(){
    if(this.comment.trim()){
      console.log("submitted comment",this.comment);
      this.closePopup();
    }else{
      alert("comment cannot be empty!!")
    }
  }

}
