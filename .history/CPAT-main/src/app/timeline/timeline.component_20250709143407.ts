
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService, ComponentItem } from '../component.service';

@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit {

  component: ComponentItem[] = [];
  component1: ComponentItem[] = [];

  constructor(
    private componentService: ComponentService, private router: Router, private route: ActivatedRoute
  ) { }
  //Navigate back to contributor page
  goBack(name: string) {
    this.router.navigate([`/contributor/${name}`]);
  }

    show:boolean=false;
    status:string='';

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const id = p.get('id');
      if (id) {
        this.componentService.getComponentById(id).subscribe(data =>{
          this.component = [data];
          this.status=data.reviewer_description;
          console.log(this.status);
        }
        );
      }
      if (id) {
        this.componentService.getComponentHistory(id).subscribe((data: ComponentItem[]) =>     //multiple rows
          this.component1 = data);
      }
    });
  }

  //Makes the first letter capital
  toSentenceCase(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
  }
}