import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from "../usuario";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService }  from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  usuario : Usuario
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUser()
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
   this.userService.getUser(id)
    .subscribe(usuario => this.usuario = usuario);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.userService.updateUser(this.usuario)
      .subscribe(() => this.goBack());
  }
}
