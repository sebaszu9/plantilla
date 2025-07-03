import { Component } from '@angular/core';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { Header } from './components/header/header';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    EmployeeListComponent,
    Header
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
