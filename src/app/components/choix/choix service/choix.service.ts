import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChoixService {
  choix:string="C";
  constructor() { }
  public getChoix(){
    return this.choix;
  }
  public setChoix(choice:string){
    this.choix=choice;
  }
}
