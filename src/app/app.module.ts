import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdminCreatorComponent } from './superAdmin/admin-creator/admin-creator.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateInvoiceComponent } from './createInvoice/create-invoice/create-invoice.component';
import { ManageInvoiceComponent } from './manageInvoice/manage-invoice/manage-invoice.component';
import { AppRoutingModule } from './app.routing';
import { AdminCreatorService } from './superAdmin/admin-creator-service';
import { RegisterComponent } from './register/register/register.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditInvoiceCreatorComponent } from './editInvoice/edit-invoice-creator/edit-invoice-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminCreatorComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CreateInvoiceComponent,
    ManageInvoiceComponent,
    RegisterComponent,
    EditInvoiceCreatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SearchPipeModule
  ],
  providers: [AdminCreatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
