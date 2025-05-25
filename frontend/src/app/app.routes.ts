import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './components/todo/todo.component';
import { StudentsComponent } from './students/students.component';

export const routes: Routes = [
    // path:'/todo' //never start with '/' 

    { path: '', component: HomeComponent },
    { path: 'todo', component: TodoComponent },
    { path: 'student', component: StudentsComponent },
];

