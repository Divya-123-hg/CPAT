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

  displayNotifications() {
    this.componentService.getNotifications(this.name).subscribe((data: ComponentItem[]) => {
      this.components3 = data;
      console.log(this.components3);
    });
  }

  notifications() {
    this.open = !this.open;
    this.displayNotifications();
    this.loadComponents('components');
  }

  closeNotification() {
    this.open = false;
  }

  removeNotification(id: number) {
    console.log('remove notification',id);
    this.componentService.deleteNotification(id).subscribe(() => {

    });
    this.displayNotifications();
  }

  details(): void {
    this.userService.getUserPassword(this.name).subscribe((data: userItem[]) =>
      this.component1 = data);
  }

  loadComponents(table: string) {
    this.componentService.getComponents(table, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

  fetch(selected: string) {
    this.componentService.getComponentsByStatus(selected, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

  search(searchText: string) {
    this.componentService.getComponentsByText(searchText, this.name).subscribe((data: ComponentItem[]) => {
      this.components = data;
    });
  }

  delete(id: number) {
    this.componentService.deleteComponentById(id).subscribe(() => {
      this.loadComponents(this.table);
    });
  }

}
