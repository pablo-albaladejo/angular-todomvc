import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoStoreService } from '../../services/todo-store.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {

  currentStatus = "";

  constructor(
    private todoStore: TodoStoreService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => params.status)
      .subscribe((status) => {
        this.currentStatus = status;
      });
  }

  remove(uid) {
    this.todoStore.remove(uid);
  }

  update() {
    this.todoStore.persist();
  }

  getTodos() {
    if (this.currentStatus == 'completed') {
      return this.todoStore.getCompleted();
    } else if (this.currentStatus == 'active') {
      return this.todoStore.getRemaining();
    } else {
      return this.todoStore.todos;
    }
  }

  allCompleted() {
    return this.todoStore.allCompleted();
  }

  setAllTo(toggleAll) {
    this.todoStore.setAllTo(toggleAll.checked);
  }

}