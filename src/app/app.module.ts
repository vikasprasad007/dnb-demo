import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './providers/app-config.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanComponent } from './loan/loan.component';
import { TransferComponent } from './transfer/transfer.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { ProductComponent } from './product/product.component';
import { HistoryComponent } from './history/history.component';
import { InvestmentComponent } from './investment/investment.component';
import { SearchPipe } from './search.pipe';
import { DateFilterPipe } from './dateFilter.pipe';
import { PayeeComponent } from './payee/payee.component';
import { LoanApplyComponent } from './loan-apply/loan-apply.component';

export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    LoanComponent,
    TransferComponent,
    ExchangeComponent,
    ProductComponent,
    HistoryComponent,
    InvestmentComponent,
    SearchPipe,
    DateFilterPipe,
    PayeeComponent,
    LoanApplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
