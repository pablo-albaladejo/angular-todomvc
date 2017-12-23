import { Component, OnInit } from '@angular/core';

import { TodoStoreService } from '../../services/todo-store.service';

@Component({
  selector: 'todo-header',
  templateUrl: './todo-header.component.html',
})
export class TodoHeaderComponent implements OnInit {

  newTodo = '';

  constructor(private todoStore: TodoStoreService) { }

  ngOnInit() {
  }

  addTodo() {
    if (this.newTodo.trim().length) {
      this.todoStore.add(this.newTodo);
      this.newTodo = '';
    }
  }

}
