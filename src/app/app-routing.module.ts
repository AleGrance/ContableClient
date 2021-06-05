import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ContribuyenteComponent } from './pages/contribuyente/contribuyente.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes: Routes = [
  {
    path: 'contribuyente_component', component: ContribuyenteComponent
  },
  {
    path: 'cliente_component', component: ClienteComponent
  },
  {
    path: 'proveedor_component', component: ProveedorComponent
  },
  {
    path: 'reporte_component', component: ReporteComponent
  },
  {
    path: 'cuentas_module',
    loadChildren: () => import('./modulos/cuentas/cuentas.module').then(m => m.CuentasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
