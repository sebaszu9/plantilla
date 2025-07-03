import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import Swal from 'sweetalert2';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css']
})
export class EmployeeFormComponent implements OnChanges {
  @Input() employeeToEdit: Employee | null = null;
  @Output() employeeAdded = new EventEmitter<Employee>();
  @Output() employeeUpdated = new EventEmitter<Employee>();

  firstname = '';
  lastname = '';
  email = '';
  phone = '';
  address = '';
  job = '';
  editing = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employeeToEdit'] && this.employeeToEdit) {
      this.firstname = this.employeeToEdit.firstname;
      this.lastname = this.employeeToEdit.lastname;
      this.email = this.employeeToEdit.email;
      this.phone = this.employeeToEdit.phone;
      this.address = this.employeeToEdit.address;
      this.job = this.employeeToEdit.job;
      this.editing = true;
    } else if (changes['employeeToEdit'] && !this.employeeToEdit) {
      this.resetForm();
    }
  }

  onSubmit() {
    if (!this.firstname || !this.lastname || !this.email || !this.job) {
      Swal.fire('Error', 'Por favor completa los campos obligatorios', 'error');
      return;
    }
    const employeeData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
      address: this.address,
      job: this.job
    };
    if (this.editing && this.employeeToEdit) {
      this.employeeService.update(this.employeeToEdit.id, employeeData).subscribe({
        next: (emp) => {
          Swal.fire('¡Actualizado!', 'Empleado actualizado correctamente', 'success');
          this.employeeUpdated.emit(emp);
          this.resetForm();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar el empleado', 'error');
        }
      });
    } else {
      this.employeeService.add(employeeData).subscribe({
        next: (emp) => {
          Swal.fire('¡Éxito!', 'Empleado agregado correctamente', 'success');
          this.employeeAdded.emit(emp);
          this.resetForm();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo agregar el empleado', 'error');
        }
      });
    }
  }

  onCancel() {
    this.resetForm();
    this.employeeUpdated.emit();
  }

  resetForm() {
    this.firstname = this.lastname = this.email = this.phone = this.address = this.job = '';
    this.editing = false;
  }
}
