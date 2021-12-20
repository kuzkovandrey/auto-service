import { OrdersComponent } from './pages/orders/orders.component';
import { AdminComponent } from './admin.component';
import { AppRoutes } from '@core/enums/app-routes.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { PriceComponent } from './pages/price/price.component';
import { PartsComponent } from './pages/parts/parts.component';
import { EmployeesComponent } from './pages/employees/employees.component';

const routes: Routes = [
  {
    path: AppRoutes.ROOT,
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: AppRoutes.EMPLOYEES,
      },
      {
        path: AppRoutes.EMPLOYEES,
        component: EmployeesComponent
      },
      {
        path: AppRoutes.PARTS,
        component: PartsComponent
      },
      {
        path: AppRoutes.PRICE,
        component: PriceComponent
      },
      {
        path: AppRoutes.ORDERS,
        component: OrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})
export class AdminRoutingModule {}
