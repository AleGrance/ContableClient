import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ContribuyenteComponent } from './pages/contribuyente/contribuyente.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { DetalleClienteComponent } from './pages/detalle-cliente/detalle-cliente.component';
import { FacturaCompraComponent } from './pages/factura-compra/factura-compra.component';
import { FacturaVentaComponent } from './pages/factura-venta/factura-venta.component';
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
    path: 'reporte/:id_contribuyente', component: ReporteComponent
  },
  {
    path: 'cuenta_component', component: CuentaComponent
  },
  {
    path: 'factura_compra/:id_contribuyente', component: FacturaCompraComponent
  },
  {
    path: 'factura_venta', component: FacturaVentaComponent
  },
  {
    path: 'detalle-cliente/:id_cliente', component: DetalleClienteComponent
  },

  // El modulo cuentas_module se importa pero no se usa. Fue para probar el lazy loading pero no se logro configurar el html
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
