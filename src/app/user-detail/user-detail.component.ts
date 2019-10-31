import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from "../usuario";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() usuario : Usuario
  constructor() { }

  ngOnInit() {
  }

}
