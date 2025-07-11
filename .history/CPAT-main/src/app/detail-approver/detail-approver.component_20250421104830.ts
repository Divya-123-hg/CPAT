import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ComponentItem, ComponentService } from '../component.service';

@Component({
  selector: 'app-detail-approver',
  standalone: false,
  templateUrl: './detail-approver.component.html',
  styleUrl: './detail-approver.component.css'
})
export class DetailApproverComponent implements OnInit{

  component : ComponentItem[]= [];
 
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private componentService : ComponentService
  ) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const id= p.get('id');
      if(id) {
        this.componentService.getComponentById(id).subscribe( data =>
          this.component= [data]);
      }
    });
  }

  update(id:number,status:string){
    this.componentService.updateStatus(id,status).subscribe(()=>{
      this.router.navigate(['/reviewer']);
    })
  }

}
