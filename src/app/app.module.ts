import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //se importa
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ContribuyenteComponent } from './pages/contribuyente/contribuyente.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProveedorComponent,
    ClienteComponent,
    ContribuyenteComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule //se importa

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
