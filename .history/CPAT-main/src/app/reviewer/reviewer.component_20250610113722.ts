import { Component, OnInit } from '@angular/core';
import { ComponentService, ComponentItem } from '../component.service';
import { userService, userItem } from '../user.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviewer',
  standalone: false,
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.css']
})


export class ReviewerComponent implements OnInit {
  components: ComponentItem[] = [];

  component1: userItem[] = [];

  constructor(private componentService: ComponentService, private userService: userService, private router: Router, private route: ActivatedRoute) { }

  selectedCategory: string = '';
  searchText: string = '';
  table: string = 'reviewer_table';
  name: string = '';


  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      const username = p.get('username');
      if (username) {
        this.name = username;
      }
    });

    this.loadComponents(this.table);
    // this.loadComponents();
    // this.loadUserComponents();
    this.details();
  }

  detailLink(id: number) {
    this.router.navigate([`/detail/${id}/${this.name}`]);
  }

  // loadUserComponents() {
  //   this.userService.getUsersWithRoles().subscribe((data: userItem[]) => {
  //     this.component1 = data;
  //   });
  // }

  details(): void {
        this.userService.getUserPassword(this.name).subscribe((data: userItem[]) =>
          this.component1 = data);
  }

  loadComponents(table: string) {
    this.componentService.getComponents(table,this.name).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

  // loadComponents() {
  //   this.componentService.getComponents().subscribe((data: ComponentItem[]) => {
  //     this.components = data;
  //   });
  // }

  fetch(selected: string) {
    this.componentService.getComponentsByStatus(selected, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

  search(searchText: string) {
    this.componentService.getComponentsByText(searchText, this.).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

}
