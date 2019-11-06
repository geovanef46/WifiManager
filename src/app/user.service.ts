import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Usuario } from './usuario';
import { USUARIOS } from "./mock-usuarios";
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private messageService : MessageService) { }

  
  getUsers() : Observable<Usuario[]> {
    this.messageService.add('UserService: buscou usuarios')
    return of (USUARIOS)
  }

  getUser(id: number) : Observable<Usuario> {
    this.messageService.add(`UserService: buscou usuario id=${id}`)
    return of (USUARIOS.find(usuario => usuario.id === id))
  }
  
}
