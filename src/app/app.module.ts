import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';

import { TodoStoreService } from './services/todo-store.service';

import { TrimPipe } from './pipes/trim.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoHeaderComponent,
    TodoItemComponent,
    TodoFooterComponent,
    TrimPipe,
  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [TodoStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
