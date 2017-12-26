import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

import { TodoModel } from '../models/todo.model';

@Injectable()
export class TodoStoreService {

	STORAGE_KEY = "angular-todomvc";

	todos: BehaviorSubject<TodoModel[]>;

	constructor() {
		this.todos = new BehaviorSubject<TodoModel[]>(this._getStorage());
	};

	_getStorage(): Array<any> {
		return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
	}

	_setStorage(items: Array<any>) {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
		this.todos.next(items);
	};

	add(item) {
		var items = this._getStorage();
		items.push(item);
		this._setStorage(items);
	}

	update(todo) {
		let items = this._getStorage().map(item => {
			return item.uid === todo.uid ? todo : item;
		});
		this._setStorage(items);
	}

	remove(uid) {
		let items = this._getStorage().filter(x => x.uid != uid);
		this._setStorage(items);
	}

	getTodos(status?): Observable<any> {
		return this.filterByStatus(status, this.todos);
	}

	filterByStatus(status, result) {
		if (status !== undefined) {
			status = status === "completed" ? true : false;
			result = result.map(changes => {
				return changes.filter((todo) => todo.completed === status);
			});
		}
		return result;
	}

	setAllTo(completed: Boolean) {
		this.getTodos().first().subscribe(todos => {
			todos.forEach(todo => {
				if (todo.completed != completed) {
					todo.completed = completed;
					this.update(todo);
				}
			});
		});
	}

	removeCompleted() {
		this.getTodos("completed").first().subscribe(items => {
			items.forEach(item => {
				this.remove(item.uid);
			});
		});
	}

	getCount(): Observable<Number> {
		return new Observable(observer => {
			this.getTodos().subscribe(items => {
				observer.next(items.length);
			});
		});
	}

	getRemainingCount(): Observable<Number> {
		return new Observable(observer => {
			this.getTodos().subscribe(items => {
				observer.next(items.filter(x => x.completed == false).length);
			});
		});
	}

	hasCompleted(): Observable<Boolean> {
		return new Observable(observer => {
			this.getTodos().subscribe(items => {
				observer.next(items.filter(x => x.completed == true).length > 0);
			});
		});
	}

	getAllCompleted(): Observable<Boolean> {
		return new Observable(observer => {
			this.getTodos().subscribe(items => {
				observer.next(items.filter(x => x.completed == false).length == 0);
			});
		});
	}
}
