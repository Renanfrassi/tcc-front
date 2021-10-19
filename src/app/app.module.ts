import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FechaduraComponent } from '../app/components/fechadura/fechadura.component';
import { UsuarioComponent } from '../app/components/usuario/usuario.component';
import { ModalUsuarioComponent } from '../app/components/usuario/modal-usuarios/modal-usuario.component';
import { SideBarComponent } from '../app/components/side-bar/side-bar.component';
import { UsuarioService } from '../app/services/usuario.service';
import { FechaduraService } from '../app/services/fechadura.service';
import { CartaoService } from '../app/services/cartao.service';
import { FormsModule } from '@angular/forms';
import { ModalFechaduraComponent } from '../app/components/fechadura/modal-fechaduras/modal-fechadura.component';

@NgModule({
  declarations: [
    AppComponent,
    FechaduraComponent,
    UsuarioComponent,
    SideBarComponent,
    ModalUsuarioComponent,
    ModalFechaduraComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    ButtonModule,
    TableModule,
    KeyFilterModule,
    MessagesModule,
    MessageModule,
    NoopAnimationsModule,
    FormsModule,
  ],

  exports : [
    KeyFilterModule,
    MessagesModule,
    MessageModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
  ],

  entryComponents: [
    ModalUsuarioComponent,
    ModalFechaduraComponent,
  ],

  providers: [
    UsuarioService,
    FechaduraService,
    CartaoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
