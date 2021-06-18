
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./auth/auth-guard.service";
import { LoggedInAuthGuard } from "./auth/login/login-auth";
import { LoginComponent } from "./auth/login/login.component";
import { CreateInvoiceComponent } from "./createInvoice/create-invoice/create-invoice.component";
import { EditInvoiceCreatorComponent } from "./editInvoice/edit-invoice-creator/edit-invoice-creator.component";
import { ManageInvoiceComponent } from "./manageInvoice/manage-invoice/manage-invoice.component";
import { RegisterComponent } from "./register/register/register.component";
import { AdminCreatorComponent } from "./superAdmin/admin-creator/admin-creator.component";

const routes: Routes = [
    { path: 'invoiceCreator', canActivate: [AuthGuardService], component: AdminCreatorComponent },
    { path: 'createInvoice', canActivate: [AuthGuardService], component: CreateInvoiceComponent },
    { path: 'manageInvoice', canActivate: [AuthGuardService], component: ManageInvoiceComponent },
    { path: '', canActivate: [LoggedInAuthGuard], component: LoginComponent },
    { path: 'registerUser', canActivate: [AuthGuardService], component: RegisterComponent },
    { path: 'registerUser/:id', canActivate: [AuthGuardService], component: RegisterComponent },
    { path: 'manageInvoice/:id', canActivate: [AuthGuardService], component: EditInvoiceCreatorComponent }

]

@NgModule(
    {
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ]
    }
)
export class AppRoutingModule {
}
