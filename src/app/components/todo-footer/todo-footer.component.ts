import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoStoreService } from '../../services/todo-store.service';

@Component({
  selector: 'todo-footer',
  templateUrl: './todo-footer.component.html',
})
export class TodoFooterComponent implements OnInit {

  currentStatus = '';

  constructor(
    private todoStore: TodoStoreService, 
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params.status)
      .subscribe((status) => {
        this.currentStatus = status || '';
      });
  }

  removeCompleted() {
    this.todoStore.removeCompleted();
  }

  getCount() {
    return this.todoStore.todos.length;
  }

  getRemainingCount() {
    return this.todoStore.getRemaining().length;
  }

  hasCompleted() {
    return this.todoStore.getCompleted().length > 0;
  }
}
