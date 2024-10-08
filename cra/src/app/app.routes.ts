import {Routes} from '@angular/router';

import {HomeComponent} from "./pages/home/home.component";
import {CraPageComponent} from "./pages/cra-page/cra-page.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cra', component: CraPageComponent },

];
