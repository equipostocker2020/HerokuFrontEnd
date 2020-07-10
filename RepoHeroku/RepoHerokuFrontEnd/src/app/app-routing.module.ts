import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { CargarProveedorComponent } from './pages/cargar-proveedor/cargar-proveedor.component';
import { ActualizarProveedorComponent } from './pages/actualizar-proveedor/actualizar-proveedor.component';
import { ActualizarUsuarioComponent} from './pages/actualizar-usuario/actualizar-usuario.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CargarProductosComponent } from './pages/cargar-productos/cargar-productos.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, data: {titulo: 'Registrarse en StockerApp'}},
  { path: 'login', component: LoginComponent, data: {titulo: 'Login'},  },
  { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'},  },
  { path: 'usuarios', component: UsuariosComponent , data: {titulo: 'Pagina de Usuarios'}},
  { path: 'profile', component: ProfileComponent , data: {titulo: 'Ver - Modificar Perfil'}},
  { path: 'proveedores', component: ProveedoresComponent , data: {titulo: 'Pagina de Proveedores'}},
  { path: 'proveedores/cargarproveedor', component: CargarProveedorComponent , data: {titulo: 'Cargar Nuevos Proveedores'}},
  { path: 'proveedor/actualizarproveedor', component: ActualizarProveedorComponent , data: {titulo: 'Ver - Modificar Proveedor'}},
  { path: 'usuario/actualizarusuario', component: ActualizarUsuarioComponent , data: {titulo: 'Ver - Modificar Usuarios'}},
  { path: 'productos', component: ProductosComponent, data: {titulo: 'Pagina de Productos'}},
  { path: 'productos/cargarproductos', component: CargarProductosComponent, data: {titulo: 'Cargar Nuevos Productos'}},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
