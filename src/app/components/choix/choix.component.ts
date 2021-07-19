import { Component, OnInit } from '@angular/core';
import { TypeEnum } from 'src/app/sign-up/sign-up.component';
import { ChoixService } from './choix service/choix.service';
@Component({
  selector: 'app-choix',
  templateUrl: './choix.component.html',
  styleUrls: ['./choix.component.css'],
})
export class ChoixComponent implements OnInit {
  choice: boolean = false;
  routeType = TypeEnum;

  constructor(private service:ChoixService) {}

  ngOnInit(): void {}
  public click() {
    this.service.setChoix("R") ;
  }
  public get() {
    return this.service.getChoix();
  }
}
