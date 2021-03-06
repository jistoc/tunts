import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ModalMensagemComponent } from './components/modal-mensagem/modal-mensagem.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ContatoComponent } from './components/contato/contato.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AutenticarComponent } from './components/autenticar/autenticar.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { AtivarComponent } from './components/ativar/ativar.component';
import { AlterarInfoComponent } from './components/alterar-info/alterar-info.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AuthGuard } from './guards/auth.guard';
import { DataTablesModule } from 'angular-datatables';

import { ValidarUsuarioService } from './services/validar-usuario.service';
import { MensagemCounterService } from './services/mensagem-counter.service';
import { AutenticacaoService } from './services/autenticacao.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AcessoItemService } from './services/acesso-item.service';
import { EventoService } from './services/evento.service';

import { TextMaskModule } from 'angular2-text-mask';
import { EditarPaginaComponent } from './components/editar-pagina/editar-pagina.component';
import { PaginaAnuncianteComponent } from './components/pagina-anunciante/pagina-anunciante.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { MensagensComponent } from './components/mensagens/mensagens.component';
import { ModalLrmComponent } from './components/modal-lrm/modal-lrm.component';
import { ControleItemComponent } from './components/controle-item/controle-item.component';
import { ModalItemComponent } from './components/modal-item/modal-item.component';
import { ModalAltitemComponent } from './components/modal-altitem/modal-altitem.component';
import { BuscaItemComponent } from './components/busca-item/busca-item.component';
import { MeusEventosComponent } from './components/meus-eventos/meus-eventos.component';
import { ModalItemEventoComponent } from './components/modal-item-evento/modal-item-evento.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'cadastro-usuario',component:CadastroUsuarioComponent},
  {path:'autenticar',component:AutenticarComponent},
  {path:'contato',component:ContatoComponent},
  {path:'perfil',component:PerfilComponent, canActivate:[AuthGuard]},
  {path:'sobre',component:SobreComponent},
  {path:'ativar',component:AtivarComponent},
  {path:'alterar-info',component:AlterarInfoComponent, canActivate:[AuthGuard]},
  {path:'editar-pagina',component:EditarPaginaComponent, canActivate:[AuthGuard]},
  {path:'a/:anunciante',component:PaginaAnuncianteComponent},
  {path:'home',component:PrincipalComponent},
  {path:'u/mensagens',component:MensagensComponent},
  {path:'u/controle-item',component:ControleItemComponent, canActivate:[AuthGuard]},
  {path:'busca-item',component:BuscaItemComponent, canActivate:[AuthGuard]},
  {path:'meus-eventos',component:MeusEventosComponent, canActivate:[AuthGuard]},
  {path:'detalhes/:evento',component:DetalhesComponent, canActivate:[AuthGuard]},
  {path:'pedidos',component:PedidosComponent, canActivate:[AuthGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContatoComponent,
    CadastroUsuarioComponent,
    PerfilComponent,
    AutenticarComponent,
    RodapeComponent,
    SobreComponent,
    AlterarInfoComponent,
    AtivarComponent,
    EditarPaginaComponent,
    PaginaAnuncianteComponent,
    ModalMensagemComponent,
    PrincipalComponent,
    MensagensComponent,
    ModalLrmComponent,
    ControleItemComponent,
    ModalItemComponent,
    ModalAltitemComponent,
    BuscaItemComponent,
    MeusEventosComponent,
    ModalItemEventoComponent,
    DetalhesComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    FormsModule,
    MyDatePickerModule,
    TextMaskModule,
    NgxQRCodeModule,
    Ng2Bs3ModalModule,
    DataTablesModule
  ],
  providers: [ValidarUsuarioService, 
                AutenticacaoService, 
                MensagemCounterService, 
                AcessoItemService,
                EventoService,
                AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
