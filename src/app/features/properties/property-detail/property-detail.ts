import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertiesService } from '../../../core/services/properties';
import { LeadsService } from '../../../core/services/leads';
import { Property } from '../../../core/models/property.model';
import { PropertyGallery } from '../../../shared/property-gallery/property-gallery';

@Component({
  selector: 'app-property-detail',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, PropertyGallery],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.scss',
})
export class PropertyDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly propertiesService = inject(PropertiesService);
  private readonly leadsService = inject(LeadsService);
  private readonly fb = inject(FormBuilder);

  property = signal<Property | null>(null);
  loading = signal(true);
  error = signal(false);

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

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    this.propertiesService.findBySlug(slug).subscribe({
      next: (property: Property) => {
        this.property.set(property);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        this.error.set(true);
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  submitContactForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const currentProperty = this.property();
    if (!currentProperty) return;

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
        propertyId: currentProperty.id,
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