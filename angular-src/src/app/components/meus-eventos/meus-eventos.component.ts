import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { MyDatePickerModule } from 'mydatepicker';
import { IMyOptions } from 'mydatepicker';
import { EventoService } from '../../services/evento.service';  
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-meus-eventos',
  templateUrl: './meus-eventos.component.html',
  styleUrls: ['./meus-eventos.component.css']
})
export class MeusEventosComponent implements OnInit {
	@ViewChild(DataTableDirective)
  	dtElement: DataTableDirective;


	data : any;
	titulo : String;
	eventos : any;


	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject();


	private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
        showTodayBtn: false,
        editableDateField: false,
        dayLabels: {su: 'Seg', mo: 'Ter', tu: 'Qua', we: 'Qui', th: 'Sex', fr: 'Sab', sa: 'Dom'},
        monthLabels: { 1: 'Jan',
                       2: 'Fev',
                       3: 'Mar',
                       4: 'Abr',
                       5: 'Mai',
                       6: 'Jun',
                       7: 'Jul',
                       8: 'Ago',
                       9: 'Set',
                       10: 'Out',
                       11: 'Nov',
                       12: 'Dez' }
    };

  	constructor(private flashMessage : FlashMessagesService,
  				private autenticacao:AutenticacaoService,
				private router:Router,
				private evtService:EventoService) { }

	ngOnInit() {
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
     	this.getEventos();

	}

	cad(){
		if(this.data==undefined || this.titulo==undefined || this.titulo.length<3)
			alert('Dados inválidos!');
		else {
			let evt = {titulo : this.titulo, 
						 data : this.data['date'].month+"/"+this.data['date'].day+"/"+this.data['date'].year,
					  usuario : JSON.parse(localStorage.getItem('usuario')).login};
			this.cadastrarEvento(evt);
		}
		
	}

	getEventos(){
		this.evtService.getEventosUsuario().subscribe(data => {
			this.eventos = data;
			for(let i=0;i<this.eventos.length;i++){
				let aux = new Date(this.eventos[i].data);
				this.eventos[i].data = this.eventos[i].data.substring(8,10)+
				                  "/"+this.eventos[i].data.substring(5,7)+
				                  "/"+this.eventos[i].data.substring(0,4);
			}
	    });
	}
	remover(id){
		this.evtService.apagar(id).subscribe(total => {
	      if(total.mensagem == 'removido'){
	        this.flashMessage.show("Evento removido com sucesso!", {cssClass: 'alert-success', timeout: 5000});

	        this.ngOnInit();
	      } else {
	        this.flashMessage.show("Falha ao remover evento!", {cssClass: 'alert-danger', timeout: 5000});
	      }
	    });
	}
	cadastrarEvento(evt){
		this.evtService.setEvento(evt).subscribe(data => {
		  
	      if(data.mensagem == 'cadastrado'){
	      	this.ngOnInit();
	      	this.titulo = "";
	      	this.data = undefined;
	      	this.flashMessage.show("Evento cadastrado com sucesso!", {cssClass: 'alert-success', timeout: 5000});
	      } else {
	        this.flashMessage.show("Falha ao cadastrar evento", {cssClass: 'alert-danger', timeout: 5000});
	      }
	      this.rerender();
	    });
	}


	ngAfterViewInit(): void {
	    this.dtTrigger.next();
  	}	
  	rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
