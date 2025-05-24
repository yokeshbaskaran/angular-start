import { Component } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})


export class TodoComponent {
  todos: Todo[] = [];
  newTitle = ''

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos()
  }


  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos)
  }

  addTodo(): void {
    if (!this.newTitle.trim()) return;

    this.todoService.addTodo(this.newTitle).subscribe(todo => {
      this.todos.push(todo);
      this.newTitle = '';
    });
  }

  deleteTodo(todo: Todo): void {
    if (!todo._id) return;
    this.todoService.deleteTodo(todo._id).subscribe(() => {
      this.todos = this.todos.filter(t => t._id !== todo._id);
    });
  }
}
