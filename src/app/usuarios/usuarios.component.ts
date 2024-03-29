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

  getUser(): void{
    this.userService.getUsers()
      .subscribe(usuarios => this.usuarios = usuarios)
  }
  
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as Usuario)
      .subscribe(usuario => {
        this.usuarios.push(usuario);
      });
  }

  delete(usuario: Usuario): void {
    this.usuarios = this.usuarios.filter(h => h !== usuario);
    this.userService.deleteUser(usuario).subscribe();
  }
}
