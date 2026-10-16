import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeadsService } from '../../../core/services/leads';

@Component({
  selector: 'app-sell',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sell.html',
  styleUrl: './sell.scss',
})
export class Sell {
  private readonly leadsService = inject(LeadsService);
  private readonly fb = inject(FormBuilder);

  sending = signal(false);
  sent = signal(false);
  sendError = signal(false);

  sellForm = this.fb.group({
    firstName: ['', Validators.required],
    phone: ['', Validators.required],
  });

  submit(): void {
    if (this.sellForm.invalid) {
      this.sellForm.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.sendError.set(false);

    const formValue = this.sellForm.getRawValue();

    this.leadsService
  .create({
    firstName: formValue.firstName!,
    phone: formValue.phone!,
    message: 'Quiere tasar/vender una propiedad (formulario "Vender")',
    source: 'whatsapp',
  })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.sent.set(true);
          this.sellForm.reset();
        },
        error: (err: unknown) => {
          this.sending.set(false);
          this.sendError.set(true);
          console.error(err);
        },
      });
  }
}