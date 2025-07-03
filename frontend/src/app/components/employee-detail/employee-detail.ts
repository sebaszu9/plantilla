import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.html',
  styleUrls: ['./employee-detail.css']
})
export class EmployeeDetailComponent {
  @Input() employee: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
