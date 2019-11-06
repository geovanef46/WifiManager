import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.userService.getUsers()
      .subscribe(usuarios => this.usuarios = usuarios.slice(1, 5));
  }
}