
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService , ComponentItem} from '../component.service';
 
@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit {
 
 
  component : ComponentItem[]= [];
 
  constructor(
    private componentService : ComponentService, private router: Router, private route: ActivatedRoute
  ) {}
 
goBack(name: string){
    this.router.navigate([`/contributor/${name}`]);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const id= p.get('id');
      console.log(id);
      if(id) {
        this.componentService.getComponentById(id).subscribe( data =>
          this.component= [data]);
      }
    });
  }
}