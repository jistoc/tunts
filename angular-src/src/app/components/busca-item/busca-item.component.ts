import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AcessoItemService } from '../../services/acesso-item.service';

@Component({
  	selector: 'app-busca-item',
  	templateUrl: './busca-item.component.html',
  	styleUrls: ['./busca-item.component.css']
})
export class BuscaItemComponent implements OnInit {

	dtOptions: DataTables.Settings = {};

  	constructor(private autenticacao:AutenticacaoService,
              private router:Router,
              private flashMessage: FlashMessagesService,
              private itens:AcessoItemService) { }
		
	ngOnInit() {

      	this.itens.listarItensBusca();
		this.dtOptions = {
        language : {
			emptyTable :  "Nenhum registro encontrado",
			info : "Mostrando de _START_ até _END_ de _TOTAL_ registros",
			infoEmpty :  "Mostrando 0 até 0 de 0 registros",
			infoFiltered :  "(Filtrados de _MAX_ registros)",
			infoPostFix : "",
			thousands : ".",
			lengthMenu : "_MENU_ resultados por página",
			loadingRecords : "Carregando...",
			processing : "Processando...",
			zeroRecords : "Nenhum registro encontrado",
			search : "Pesquisar",
			paginate: {
			next: "Próximo",
			previous: "Anterior",
			first: "Primeiro",
			last: "Último"
			},
				aria : {
			  		sortAscending: ": Ordenar colunas de forma ascendente",
			  		sortDescending: ": Ordenar colunas de forma descendente"
				}
			}
     	};
	}

}
