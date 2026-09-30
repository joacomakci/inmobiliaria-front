import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertiesService } from '../../../core/services/properties';
import { Property } from '../../../core/models/property.model';
import { PropertyCard } from '../../../shared/property-card/property-card';

@Component({
  selector: 'app-property-list',
  imports: [CommonModule, PropertyCard, FormsModule],
  templateUrl: './property-list.html',
  styleUrl: './property-list.scss',
})
export class PropertyList implements OnInit {
  private readonly propertiesService = inject(PropertiesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  properties = signal<Property[]>([]);
  loading = signal(true);
  error = signal(false);

  operation = this.route.snapshot.data['operation'] as string | undefined;

  filters = {
    type: '',
    city: '',
    rooms: '',
    maxPrice: '',
  };

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.filters = {
        type: params.get('type') ?? '',
        city: params.get('city') ?? '',
        rooms: params.get('rooms') ?? '',
        maxPrice: params.get('maxPrice') ?? '',
      };
      this.fetchProperties();
    });
  }

  applyFilters(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        type: this.filters.type || null,
        city: this.filters.city || null,
        rooms: this.filters.rooms || null,
        maxPrice: this.filters.maxPrice || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  private fetchProperties(): void {
    this.loading.set(true);

    this.propertiesService
      .findAll({
        operation: this.operation,
        type: this.filters.type || undefined,
        city: this.filters.city || undefined,
        rooms: this.filters.rooms ? Number(this.filters.rooms) : undefined,
        maxPrice: this.filters.maxPrice ? Number(this.filters.maxPrice) : undefined,
      })
      .subscribe({
        next: (properties: Property[]) => {
          this.properties.set(properties);
          this.loading.set(false);
        },
        error: (err: unknown) => {
          this.error.set(true);
          this.loading.set(false);
          console.error(err);
        },
      });
  }
}