import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SearchEventArgs } from './interfaces/search-event-args';
import { AgencyService } from './services/agency.service';
import { MissionService } from './services/mission.service';
import { StatusService } from './services/status.service';
import { Agency } from './interfaces/agency';
import { Mission } from './interfaces/mission';
import { Status } from './interfaces/status';
import { LaunchService } from './services/launch.service';
import { Launch } from './interfaces/launch';
import { forkJoin } from 'rxjs';
import { SearchStatus } from './interfaces/search-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tarea 5';

  loading:boolean = true;
  searchStatus:SearchStatus = { searching: false };

  //Listado de agencias que aparecen en el desplegable
  agencies:Agency[] = [];
  
  //Listado de tipos de misión
  missions:Mission[] = [];
  
  //Listado de estado de lanzamientos de mision
  statuses:Status[] = [];
  
  //Lanzamientos correspondientes a un criterio de búsqueda
  launches:Launch[] = [];

  constructor(private agencyService:AgencyService, 
              private missionService:MissionService, 
              private statusService:StatusService, 
              private launchService:LaunchService) { }

  ngOnInit() {
  
    //Obtenemos los datos del desplegable de sus respectivos servicios, al hacer un forkJoin esperamos a que completen las tres peticiones
    //y solo lanzamos un "ChangeDetection"

    forkJoin( this.agencyService.getAgencies(),
              this.missionService.getMissions(),
              this.statusService.getStatuses()).subscribe(result => {
      this.agencies = result[0];
      this.missions = result[1];
      this.statuses = result[2];
      this.loading = false;
    });
  }

  onSearch(eventArgs:SearchEventArgs) : void {
    this.searchStatus = { searching: true };
    this.launchService.search(eventArgs.searchMode, eventArgs.id).subscribe((data:Launch[])=>{
        this.launches = data;
        this.searchStatus = { searching: false };
    });  
  }
}
