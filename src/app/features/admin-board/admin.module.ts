import { OrderInfoService } from './services/order-info.service';
import { OrdersComponent } from './pages/orders/orders.component';
import { PriceService } from './services/price.service';
import { PartService } from './services/part.service';
import { EmployeeService } from './services/employee.service';
import { SharedModule } from '@shared/shared.module';
import { PriceComponent } from './pages/price/price.component';
import { PartsComponent } from './pages/parts/parts.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    EmployeesComponent,
    PartsComponent,
    PriceComponent,
    OrdersComponent
  ],
  providers: [
    EmployeeService,
    PartService,
    PriceService,
    OrderInfoService
  ],
})
export class AdminModule { }
