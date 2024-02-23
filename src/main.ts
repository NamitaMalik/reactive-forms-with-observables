import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="saveChanges()">
      <label for="firstName">First Name:</label>
      <input formControlName="firstName" id="firstName" />

      <label for="lastName">Last Name:</label>
      <input formControlName="lastName" id="lastName" />

      <label for="country">Country:</label>
      <select formControlName="country" id="country">
        <!-- Add your country options here -->
        <option value="country1">Country 1</option>
        <option value="country2">Country 2</option>
      </select>

      <label for="phoneNumber">Phone Number:</label>
      <input formControlName="phoneNumber" id="phoneNumber" />

      <button type="submit" [disabled]="!hasChanges">Save Changes</button>
    </form>
  `,
})
export class App {
  private initialFormValue: any;
  protected hasChanges = false;
  protected userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize the form with dummy values
    this.userForm = this.fb.group({
      firstName: ['John'],
      lastName: ['Doe'],
      country: ['country1'],
      phoneNumber: ['123-456-7890'],
    });

    // Save the initial form value
    this.initialFormValue = { ...this.userForm.value };

    // Subscribe to form value changes for dynamic functionality
    this.userForm.valueChanges.subscribe((val: any) => {
      this.hasChanges = this.hasFormChanged(val);
    });
  }

  hasFormChanged(val: any) {
    return JSON.stringify(val) !== JSON.stringify(this.initialFormValue);
  }

  saveChanges() {
    // Handle save functionality here
    console.log('Changes saved!');
    // Reset form state after saving changes
    this.userForm.markAsPristine();
  }
}

bootstrapApplication(App);
