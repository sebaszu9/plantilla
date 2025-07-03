
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { EmployeeFormComponent } from '../employee-form/employee-form';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent, EmployeeDetailComponent],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  showForm = false;
  selectedEmployee: Employee | null = null;
  employeeToEdit: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  onEmployeeAdded(emp: Employee) {
    this.showForm = false;
    this.loadEmployees();
  }

  onEmployeeUpdated(emp?: Employee) {
    this.employeeToEdit = null;
    this.showForm = false;
    this.loadEmployees();
  }

  viewEmployee(emp: Employee) {
    this.selectedEmployee = emp;
  }

  editEmployee(emp: Employee) {
    this.employeeToEdit = emp;
    this.showForm = true;
  }

  deleteEmployee(emp: Employee) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Eliminar a ${emp.firstname} ${emp.lastname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.employeeService.delete(emp.id).subscribe(() => {
          Swal.fire('Eliminado', 'Empleado eliminado correctamente', 'success');
          this.loadEmployees();
          if (this.selectedEmployee && this.selectedEmployee.id === emp.id) {
            this.selectedEmployee = null;
          }
        });
      }
    });
  }
}
