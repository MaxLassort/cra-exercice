import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AsyncPipe} from "@angular/common";
import {HomeComponent} from "./pages/home/home.component";
import {NavComponent} from "./core/components/nav/nav.component";
import {HeaderComponent} from "./core/components/header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, HomeComponent, NavComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  constructor() {

  }
}
