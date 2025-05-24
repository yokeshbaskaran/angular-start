import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { StudentsComponent } from './students/students.component';

export const routes: Routes = [
    { path: '/', component: AppComponent },
    { path: '/todo', component: TodoComponent },
    { path: '/student', component: StudentsComponent },
];
