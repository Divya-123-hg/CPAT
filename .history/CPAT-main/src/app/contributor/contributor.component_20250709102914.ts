import { Component, OnInit } from '@angular/core';
import { ComponentService, ComponentItem } from '../component.service';
import { userService, userItem } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contributor',
  standalone: false,
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css']
})
export class ContributorComponent implements OnInit {

  components: ComponentItem[] = [];
  components3: ComponentItem[] = [];
  component1: userItem[] = [];

  page = 1;
  itemsPerPage = 1;
  totalItems = 0;

  constructor(private componentService: ComponentService, private userService: userService, private router: Router, private route: ActivatedRoute) { }

  selectedCategory: string = '';
  searchText: string = '';
  table: string = 'components';
  name: string = '';

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
    this.loadComponents('components');
  }

  //closes the pop-up
  closeNotification() {
    this.open = false;
  }

  //removes the notifications
  removeNotification(id: number) {
    console.log('remove notification', id);
    this.componentService.deleteNotification(id, this.table).subscribe(() => {
    });
    this.displayNotifications();
  }

  //gets the user details from the user table
  details(): void {
    this.userService.getUserPassword(this.name).subscribe((data: userItem[]) =>
      this.component1 = data
    );
  }

  //loads the components from the contributor table based on the contributor
  loadComponents(table: string) {
    this.componentService.getComponents(table, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

  // Filtering by Status(Drop down box)
  fetch(selected: string) {
    this.componentService.getComponentsByStatus(selected, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

  //Search by Component name
  search(searchText: string) {
    if (searchText == '') {
      this.componentService.getComponentsByStatus('all', this.name).subscribe((data: ComponentItem[]) => {
        this.components = data;
      });
    } else {
      this.componentService.getComponentsByText(searchText, this.name).subscribe((data: ComponentItem[]) => {
        this.components = data;
      });
    }
  }

  //Deletes the components
  delete(id: number) {
    this.componentService.deleteComponentById(id).subscribe(() => {
      this.loadComponents(this.table);
    });
  }

  Ispublished: boolean = false;

  //Displays only the approved compo
  loadApprovedComponents(table: string) {
    this.componentService.getComponents(table, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data.filter(item =>
        item.status === 'approved'
      );
    });
  }

  published() {
    this.Ispublished = true;
    this.loadApprovedComponents('approver_table');
  }

  back() {
    this.Ispublished = false;
    this.loadComponents(this.table);
  }


  toSentenceCase(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
  }

}
