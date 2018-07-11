import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';

const contentRoutes: Routes = [{
  path: '',
  component: ContentComponent
}];

export const contentRouting: ModuleWithProviders = RouterModule.forChild(contentRoutes);
