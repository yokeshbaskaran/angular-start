import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentData, StudentService } from '../service/student.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-students',
  imports: [FormsModule, CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})


export class StudentsComponent {
  name: String = '';
  address: String = '';
  phone: String = '';

  students: StudentData[] = [];

  data = {}

  constructor(private formsService: StudentService) { }

  ngOnInit(): void {
    console.log('Component initialized');
    this.loadForms()
  }

  loadForms() {
    this.formsService.getDatas().subscribe(data => {
      console.log('Loaded students:', data);
      this.students = data
    })
  }


  userData() {
    if (!this.name && !this.address && !this.phone) {
      return alert("Enter details")
    }

    const newStudent: StudentData = {
      name: this.name,
      address: this.address,
      phone: this.phone
    }

    this.formsService.addData(newStudent).subscribe(newData => {
      this.students.push(newData);

      // Clears form
      this.name = '';
      this.address = '';
      this.phone = '';
    })
  }
}
