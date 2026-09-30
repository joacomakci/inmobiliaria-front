import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyImage } from '../../core/models/property.model';

@Component({
  selector: 'app-property-gallery',
  imports: [CommonModule],
  templateUrl: './property-gallery.html',
  styleUrl: './property-gallery.scss',
})
export class PropertyGallery {
  images = input.required<PropertyImage[]>();
  title = input<string>('');

  selectedIndex = signal(0);
  lightboxOpen = signal(false);

  select(index: number): void {
    this.selectedIndex.set(index);
  }

  openLightbox(): void {
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  next(event?: Event): void {
    event?.stopPropagation();
    const total = this.images().length;
    this.selectedIndex.update((i) => (i + 1) % total);
  }

  previous(event?: Event): void {
    event?.stopPropagation();
    const total = this.images().length;
    this.selectedIndex.update((i) => (i - 1 + total) % total);
  }
}