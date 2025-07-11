import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ComponentService , ComponentItem} from '../component.service';
 
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  standalone:false,
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
 
 
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