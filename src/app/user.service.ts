import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usuariosUrl = 'api/usuarios';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  
  getUsers() : Observable<Usuario[]> {

    return this.http.get<Usuario[]>(this.usuariosUrl)
    .pipe(
      tap(_ => this.log('Buscou usuarios')),
      catchError(this.handleError<Usuario[]>('getUsers', []))
    );
  }


  getUser(id: number) : Observable<Usuario> {
    const url = `${this.usuariosUrl}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => this.log(`buscou um usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`getUser id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** PUT: update the hero on the server */
updateUser (usuario: Usuario): Observable<any> {
  return this.http.put(this.usuariosUrl, usuario, this.httpOptions).pipe(
    tap(_ => this.log(`atualizou o usuario id=${usuario.id}`)),
    catchError(this.handleError<any>('updateUser'))
  );
}

/** POST: add a new hero to the server */
addUser (usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(this.usuariosUrl, usuario, this.httpOptions).pipe(
    tap((newUser: Usuario) => this.log(`Add usuario w/ id=${newUser.id}`)),
    catchError(this.handleError<Usuario>('addUser'))
  );
}

/** DELETE: delete the hero from the server */
deleteUser (usuario: Usuario | number): Observable<Usuario> {
  const id = typeof usuario === 'number' ? usuario : usuario.id;
  const url = `${this.usuariosUrl}/${id}`;

  return this.http.delete<Usuario>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deletado usuario id=${id}`)),
    catchError(this.handleError<Usuario>('deleteUser'))
  );
}
  
}
