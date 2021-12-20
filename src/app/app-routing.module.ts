import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './features/home/home.component';
import { AppRoutes } from './core/enums/app-routes.enum';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: AppRoutes.ROOT,
    redirectTo: AppRoutes.HOME,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.HOME,
    component: HomeComponent
  },
  {
    path: AppRoutes.AUTH,
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: AppRoutes.ORDER,
    loadChildren: () =>
      import('./features/order/order.module').then(m => m.OrderModule)
  },
  {
    path: AppRoutes.ADMIN,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/admin-board/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: AppRoutes.HOME
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
