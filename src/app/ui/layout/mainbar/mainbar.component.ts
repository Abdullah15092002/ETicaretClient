import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrl: './mainbar.component.scss'
})
export class MainbarComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit(): void {

  }
}
