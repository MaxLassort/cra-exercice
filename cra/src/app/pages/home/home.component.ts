import {Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {NavComponent} from "../../core/components/nav/nav.component";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../core/components/header/header.component";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    NavComponent,
    RouterOutlet,
    HeaderComponent,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
