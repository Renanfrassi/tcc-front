import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationConfig, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalFechaduraComponent } from '../app/components/fechadura/modal-fechaduras/modal-fechadura.component';
import { CartaoComponent } from '../app/components/cartao/cartao.component';
import { ModalCartaoComponent } from './components/cartao/modal-cartao/modal-cartao.component';

@NgModule({
  declarations: [
    AppComponent,
    FechaduraComponent,
    UsuarioComponent,
    SideBarComponent,
    ModalUsuarioComponent,
    ModalFechaduraComponent,
    CartaoComponent,
    ModalCartaoComponent,
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
    ReactiveFormsModule,
    NgbTimepickerModule,
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
    ModalCartaoComponent,
  ],

  providers: [
    UsuarioService,
    FechaduraService,
    CartaoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
