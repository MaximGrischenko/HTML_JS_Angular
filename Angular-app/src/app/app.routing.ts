import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './modules/content-module/content.module#ContentModule'
  },
  {
    path: 'catering',
    redirectTo: '/'
  },
  {
    path: 'about',
    redirectTo: '/'
  },
  {
    path: 'contacts',
    loadChildren: './modules/contact-module/contact.module#ContactModule'
  }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
