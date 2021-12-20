import { OrderInfoComponent } from './order-info/order-info.component';
import { OrderService } from './order.service';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '@shared/shared.module';
import { OrderComponent } from './order.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  declarations: [
    OrderComponent,
    OrderInfoComponent
  ],
  providers: [
    OrderService
  ],
})
export class OrderModule { }
