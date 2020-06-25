import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor() { }
  showFiller = false;
  ngOnInit(): void {
  }

}
