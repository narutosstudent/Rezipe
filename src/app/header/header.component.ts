import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {}


  ngOnInit(): void {
  }

  onClick() {
    let check = document.getElementsByClassName("checkbox")[0] as HTMLInputElement;
    check.checked = false;
  }
}
