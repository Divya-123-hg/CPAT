import { Component, OnInit } from '@angular/core';
import { ComponentService, ComponentItem } from '../component.service';
import { userService, userItem } from '../user.service';
import { Router,Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approver',
  standalone: false,
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {
  
  components: ComponentItem[] = [];

 component1:userItem[]=[];
 
 constructor(private componentService : ComponentService,  private userService: userService, private router: Router, private route: ActivatedRoute ){}


  selectedCategory: string = '';
  searchText: string = '';
  table:string='reviewer_table';
  name:string='';

 ngOnInit() {
  this.route.paramMap.subscribe( p => {
      const username= p.get('username');
      if(username){
      this.name=username;
      }
    });
    this.loadComponents(this.table);
    // this.loadUserComponents();
    this.details();
  }

  //   loadUserComponents() {
  //   this.userService.getUsersWithRoles().subscribe((data: userItem[]) => {
  //     this.component1 = data;
      
  //   });
  // }

    details():void{
      this.route.paramMap.subscribe( p => {
      const username= p.get('username');
      if(username){
      this.userService.getUserPassword(username).subscribe( (data: userItem[]) =>
      this.component1= data);
      }
    });
  }

  loadComponents(table:string) {
    this.componentService.getComponents(table,this.name).subscribe((data: ComponentItem[]) => {
      this.components = data.filter(item =>
        item.status === 'approved' ||
        item.status === 'rejected' ||
        item.status === 'reviewed'
      );
    });
  }

  fetch(selected: string) {
    this.componentService.getComponentsByStatus(selected, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

    search(searchText: string) {
    if (searchText == '') {
      this.componentService.getComponentsByStatus('all', this.table).subscribe((data: ComponentItem[]) => {
        this.components = data;
      });
    } else{
    this.componentService.getComponentsByText(searchText, this.table).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }
  }

  onView(id:number){
      this.route.paramMap.subscribe(p => {
      const username = p.get('username');
      console.log(username);
      if (username) {
        this.router.navigate([`/detailapprover/${id}/${username}`]);
      }
    });
  }

}
