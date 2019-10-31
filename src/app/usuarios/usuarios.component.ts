import { Component, OnInit } from '@angular/core';
import {Usuario} from '../usuario'
import { UserService } from "../user.service";


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios : Usuario[]
  constructor(private userService : UserService) { 
    
  }

  ngOnInit() {
    this.getUser()
  }

  selectedUser : Usuario
  onSelect(usuario : Usuario) : void{
    this.selectedUser = usuario
  }

  
  getUser(): void{
    this.userService.getUser()
      .subscribe(usuarios => this.usuarios = usuarios)
  }
  
}
