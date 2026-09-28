import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../../core/models/property.model';
import { PropertiesService } from '../../../core/services/properties';

@Component({
  selector: 'app-property-list',
  imports: [CommonModule],
  templateUrl: './property-list.html',
  styleUrl: './property-list.scss',
})
export class PropertyList implements OnInit {
  private readonly propertiesService = inject(PropertiesService);

  properties: Property[] = [];
  loading = true;
  error = false;

 ngOnInit(): void {
  this.propertiesService.findAll().subscribe({
    next: (properties: Property[]) => {
      this.properties = properties;
      this.loading = false;
    },
    error: (err: unknown) => {
      this.error = true;
      this.loading = false;
      console.error(err);
    },
  });
 }}