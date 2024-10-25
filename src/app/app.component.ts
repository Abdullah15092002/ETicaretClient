import { Component, Input, OnInit, } from '@angular/core';
import { data } from 'jquery';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
declare var $: any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ETicaretClient';
  constructor() { }

  ngOnInit(): void {

  }

}


