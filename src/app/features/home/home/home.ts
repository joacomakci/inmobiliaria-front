import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly router = inject(Router);

  operation: 'alquiler' | 'venta' = 'alquiler';

  search(): void {
    this.router.navigate(['/', this.operation === 'alquiler' ? 'alquilar' : 'comprar']);
  }
}