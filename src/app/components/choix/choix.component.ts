import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choix',
  templateUrl: './choix.component.html',
  styleUrls: ['./choix.component.css']
})
export class ChoixComponent implements OnInit {
choice:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  public click (){
    this.choice=true;

  }
  public get  (){
    return this.choice;
  }
}
