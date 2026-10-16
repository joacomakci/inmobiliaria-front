import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeadsService } from '../../../core/services/leads';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly leadsService = inject(LeadsService);
  private readonly fb = inject(FormBuilder);

  sending = signal(false);
  sent = signal(false);
  sendError = signal(false);

  contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', Validators.required],
  });

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.sendError.set(false);

    const formValue = this.contactForm.getRawValue();

    this.leadsService
      .create({
        firstName: formValue.firstName!,
        lastName: formValue.lastName!,
        email: formValue.email!,
        phone: formValue.phone || undefined,
        message: formValue.message!,
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.sent.set(true);
          this.contactForm.reset();
        },
        error: (err: unknown) => {
          this.sending.set(false);
          this.sendError.set(true);
          console.error(err);
        },
      });
  }
}