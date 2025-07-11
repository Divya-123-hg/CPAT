// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-contributor-dashboard',
//   standalone: false,
//   templateUrl: './contributor-dashboard.component.html',
//   styleUrl: './contributor-dashboard.component.css'
// })
// export class ContributorDashboardComponent {
//   searchTerm: string = '';
//   selectedCategory: string = '';
//   selectedStatus: string = '';
//   components = [
//     {
//       id: '123F',
//       name: 'JSON library',
//       category: 'Library',
//       status: 'Rejected',
//       feedback: {reviewer: 'Missing Documentation', approver:'Bad Format Used'}
//     },
//     {
//       id: '456G',
//       name: 'ADD API',
//       category: 'API',
//       status: 'Approved',
//       feedback: {reviewer: 'Looks Clean', approver:'Approve for production'}
//     },
//   ];

//   categories= ['API','Library','Plugin'];
//   statuses= ['Submitted','Reviewed','Approved','Rejected'];

//   selectedFeedback: any = null;

//   filteredComponents(){
//     return this.components.filter(c=>
//     (!this.searchTerm || c.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
//     (!this.selectedCategory || c.category === this.selectedCategory) &&
//     (!this.selectedStatus || c.status === this.selectedStatus)
//     );
//   }
//   openFeedback(component:any){
//     this.selectedFeedback= component.feedback;
//   }

//   closeFeedback(){
//     this.selectedFeedback=null;
//   }
//   currentPage: number = 1;
//   itemsPerPage: number = 5;

//   get totalPages(){
//     return Math.ceil(this.filteredComponents().length/this.itemsPerPage);
//   }

//   paginatedComponents(){
//     const start = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredComponents().slice(start,start+this.itemsPerPage);
//   }
// }
