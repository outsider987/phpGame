import { Component, OnInit } from '@angular/core';

import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor() { }
  showFiller = false;
  ngOnInit(): void {
  }
  toggleSideNav(drawer: MatSidenav) {
    drawer.toggle().then((result: MatDrawerToggleResult) => {
      console.log('選單狀態：' + result);
    });

  }

}
