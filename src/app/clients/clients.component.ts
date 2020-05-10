import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit {


  constructor(private clientsService: ClientsService) {
  }

  ngOnInit() {
    
  }


  ngAfterViewInit() {
  }

}
