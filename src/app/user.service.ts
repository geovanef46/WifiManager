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

  
  getUser() : Observable<Usuario[]> {
    this.messageService.add('UserService: fetched usuarios')
    return of (USUARIOS)
  }
  
}
