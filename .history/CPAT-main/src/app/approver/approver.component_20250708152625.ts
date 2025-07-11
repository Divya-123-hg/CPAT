import { Component, OnInit } from '@angular/core';
import { ComponentService, ComponentItem } from '../component.service';
import { userService, userItem } from '../user.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approver',
  standalone: false,
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {

  components: ComponentItem[] = [];
  components3: ComponentItem[] = [];
  component1: userItem[] = [];

  constructor(private componentService: ComponentService, private userService: userService, private router: Router, private route: ActivatedRoute) { }


  selectedCategory: string = '';
  searchText: string = '';
  table: string = 'approver_table';
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

  details(): void {
    this.route.paramMap.subscribe(p => {
      const username = p.get('username');
      if (username) {
        this.userService.getUserPassword(username).subscribe((data: userItem[]) =>
          this.component1 = data);
      }
    });
  }

  loadComponents(table: string) {
    this.componentService.getComponents(table, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data.filter(item =>
        item.status === 'approved' ||
        item.status === 'More Details Required' ||
        item.status === 'reviewed' ||
        // item.approved_by === null  ||
        item.approved_by === this.name
      );
    });
  }

  fetch(selected: string) {
    this.componentService.getComponentsByStatus(selected, this.table).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

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

  onView(id: number) {
    this.route.paramMap.subscribe(p => {
      const username = p.get('username');
      console.log(username);
      if (username) {
        this.router.navigate([`/detailapprover/${id}/${username}`]);
      }
    });
  }

  open: boolean = false;

  displayNotifications() {
    this.componentService.getNotifications(this.name, this.table).subscribe((data: ComponentItem[]) => {
      this.components3 = data;
      console.log(this.components3);
    });
  }

  notifications() {
    this.open = !this.open;
    this.displayNotifications();
    this.loadComponents(this.table);
  }

  closeNotification() {
    this.open = false;
  }

  removeNotification(id: number) {
    console.log('remove notification', id);
    this.componentService.deleteNotification(id, this.table).subscribe(() => {
    });
    this.displayNotifications();
  }

  toSentenceCase(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
  }

}
