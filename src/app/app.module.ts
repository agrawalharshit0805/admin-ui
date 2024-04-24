import { TestComponent } from './test/test.component';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MaintenancePeriodListComponent } from './maintenance-period-list/maintenance-period-list.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    MaintenancePeriodListComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    CommonModule,
    TranslateModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // Add ToastrModule.forRoot()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
