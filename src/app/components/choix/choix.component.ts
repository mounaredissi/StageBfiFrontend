import { Component, OnInit } from '@angular/core';
import { TypeEnum } from 'src/app/sign-up/sign-up.component';

@Component({
  selector: 'app-choix',
  templateUrl: './choix.component.html',
  styleUrls: ['./choix.component.css'],
})
export class ChoixComponent implements OnInit {
  choice: boolean = false;
  routeType = TypeEnum;

  constructor() {}

  ngOnInit(): void {}
  public click() {
    this.choice = true;
  }
  public get() {
    return this.choice;
  }
}
