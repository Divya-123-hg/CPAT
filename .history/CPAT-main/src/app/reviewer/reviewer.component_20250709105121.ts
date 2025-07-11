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
  components3: ComponentItem[] = [];
  component1: userItem[] = [];

  constructor(private componentService: ComponentService, private userService: userService, private router: Router, private route: ActivatedRoute) { }

  selectedCategory: string = '';
  searchText: string = '';
  table: string = 'reviewer_table';
  name: string = '';

  page = 1;
  itemsPerPage = 1;
  totalItems = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      const username = p.get('username');
      if (username) {
        this.name = username;
      }
    });

    this.loadComponents(this.table);
    this.details();
  }

  //Navigates to the Detail page
  detailLink(id: number) {
    this.router.navigate([`/detail/${id}/${this.name}`]);
  }

  //Fetches the user from the user table
  details(): void {
    this.userService.getUserPassword(this.name).subscribe((data: userItem[]) =>
      this.component1 = data);
  }

  //Loads the components based on the reviewer
  loadComponents(table: string) {
    this.componentService.getComponents(table, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data.filter(item =>
        item.reviewed_by === null ||
        item.reviewed_by === this.name
      );
    });
  }

  // Filtering by Status(Drop down box)
  fetch(selected: string) {
    this.componentService.getComponentsByStatus(selected, this.table).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

  //Search by Component name
  search(searchText: string) {
    if (searchText == '') {
      this.componentService.getComponentsByStatus('all', this.table).subscribe((data: ComponentItem[]) => {
        this.components = data;
      });
    } else {
      this.componentService.getComponentsByText(searchText, this.table).subscribe((data: ComponentItem[]) => {
        this.components = data;
      });
    }
  }


  open: boolean = false;

  //Displays the notifications
  displayNotifications() {
    this.componentService.getNotifications(this.name, this.table).subscribe((data: ComponentItem[]) => {
      this.components3 = data;
      console.log(this.components3);
    });
  }

  //Opens the pop-up
  notifications() {
    this.open = !this.open;
    this.displayNotifications();
    this.loadComponents(this.table);
  }

  //Closes the pop-up
  closeNotification() {
    this.open = false;
  }

  //Removes the notifications
  removeNotification(id: number) {
    console.log('remove notification', id);
    this.componentService.deleteNotification(id, this.table).subscribe(() => {

    });
    this.displayNotifications();
  }

  //Makes the first letter capital
  toSentenceCase(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
  }
}
