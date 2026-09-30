import { Routes } from '@angular/router';
import { Home } from './features/home/home/home';
import { PropertyList } from './features/properties/property-list/property-list';
import { PropertyDetail } from './features/properties/property-detail/property-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'alquilar', component: PropertyList, data: { operation: 'alquiler' } },
  { path: 'comprar', component: PropertyList, data: { operation: 'venta' } },
  { path: 'propiedades/:slug', component: PropertyDetail },
];