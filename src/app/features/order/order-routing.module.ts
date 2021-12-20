import { OrderInfoComponent } from './order-info/order-info.component';
import { OrderComponent } from './order.component';
import { AppRoutes } from '@core/enums/app-routes.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: AppRoutes.ORDER_INFO,
    component: OrderInfoComponent
  },
  {
    path: AppRoutes.ROOT,
    component: OrderComponent
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
export class OrderRoutingModule {}
