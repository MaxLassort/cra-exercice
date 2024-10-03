import {Component} from '@angular/core';
import {CraComponent} from "../../core/components/cra/cra.component";
import {HeaderComponent} from "../../core/components/header/header.component";

@Component({
  selector: 'app-cra-page',
  standalone: true,
  imports: [
    CraComponent,
    HeaderComponent
  ],
  templateUrl: './cra-page.component.html',
  styleUrl: './cra-page.component.css'
})
export class CraPageComponent {

}
