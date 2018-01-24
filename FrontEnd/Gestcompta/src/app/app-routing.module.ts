import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CommandComponent } from './command/command.component';
import { ProductComponent } from './product/product.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { AuthGardService } from './gard/auth-gard.gard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'showcase', component: ShowcaseComponent, canActivate: [AuthGardService] },
    { path: 'login', component: AuthenticationComponent},
    { path: 'product/:id', component: ProductComponent, canActivate: [AuthGardService]},
    { path: 'command', component: CommandComponent, canActivate: [AuthGardService]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
