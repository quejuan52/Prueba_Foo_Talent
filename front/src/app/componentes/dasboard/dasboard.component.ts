import { Component } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [MenulateralComponent],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css'
})
export class DasboardComponent {

}
