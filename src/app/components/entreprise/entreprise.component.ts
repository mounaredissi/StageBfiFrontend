import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit
 {
  name = 'Angular';
  secondFormGroup: FormGroup;
  firstFormGroup: FormGroup
  
  constructor(private _formBuilder: FormBuilder) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required] });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required] });
  }
  ngOnInit() {
}
}