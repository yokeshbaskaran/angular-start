import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  imports: [FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})


export class StudentsComponent {
  name: String = '';
  address: String = '';
  phone: String = '';
}
