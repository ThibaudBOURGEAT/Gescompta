import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProductComponent } from './product/product.component';
import { CommandComponent } from './command/command.component';
import { AppRoutingModule } from './/app-routing.module';
import { ShowcaseComponent } from './showcase/showcase.component';

import { MessageService } from './services/message.service';
import { ApiService } from './services/api.service';
import { AuthGardService } from './gard/auth-gard.gard'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthenticationComponent,
    ProductComponent,
    CommandComponent,
    ShowcaseComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule
  ],
  providers: [MessageService, ApiService, AuthGardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
