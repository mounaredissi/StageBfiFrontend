import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
interface piece {
  value: string;
  viewValue: string;
}
export enum TypeEnum {
  CANDIDAT,
  ENTREPRISE,
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  type: number;
  typeEnum = TypeEnum;
  services: any;
  formClient: FormGroup;
  formEntreprise: FormGroup;

  forms: FormGroup[];
  var: boolean = false;
  selectedServices: SignUpService[] = [];
  page = 0;
  piece: piece[] = [
    { value: 'CIN', viewValue: 'CIN' },
    { value: 'passeport', viewValue: 'passeport' },
    { value: 'carte séjour', viewValue: 'carte séjour' },
  ];
  documents: any;
  signUpForm = {
    firstName: '',
    lastName: '',
    email: '',
  };
  submitted = false;
  constructor(
    private inscriptionService: SignUpService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.type = this.route.snapshot.params.type;
    this.formClient = this._formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      numtel: ['', Validators.required],
      adresseemail: ['', Validators.required],
      pjControl: ['', Validators.required],
      dateexp: ['', Validators.required],
    });
    this.formEntreprise = this._formBuilder.group({
      name: ['', Validators.required],
      lastname:['', Validators.required],
      numtel:['',Validators.required],
      adresseemail:['',Validators.required],
      pjControl:['',Validators.required],
     dateexp:['', Validators.required],
     numpiece:['', Validators.required],
     adresse:['', Validators.required],
     nameprof :['', Validators.required],
     lastnameprof:['', Validators.required],
     numtelprof:['', Validators.required],
     adresseprof:['', Validators.required],
     adressemailprof:['', Validators.required],

   });

    this.var = true;
    this.forms = [this.formClient, this.formEntreprise];
  }

  ngOnInit(): void {
    this.inscriptionService.getAllServicesList().subscribe(
      (data) => {
        this.services = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.inscriptionService.getAllDocumentList().subscribe(
      (data) => {
        this.documents = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public next() {
    // console.log(this.form1);
    this.page < 3 && this.page++;
  }

  public adddoc(doc: any) {
    console.log(doc);
  }

  public back() {
    this.page -= 1;
  }
  public getFinalPrice(): number {
    return this.selectedServices.reduce(
      (acc: any, currentService: any) => acc + currentService.price,
      0
    );
  }

  public addService(service: SignUpService) {
    console.log(service);
    const index = this.selectedServices.indexOf(service);
    if (index > -1) {
      this.selectedServices.splice(index, 1);
    } else {
      this.selectedServices.push(service);
    }
  }
  /* submit() {

{
  ClientId: this.formCandidat.value.id,

}



    debugger;
  //  const { name, lastname, numtel, adresseemail, pjControl } = this.form1.value;

    /*const formObj = {
      name,
      lastname,
      numtel,
      adresseemail,
      pjControl
    };

    console.log(formObj);
    this.inscriptionService.create(formObj).subscribe(res => {
      console.log('subscription sent successfully!');
      console.log(res);
    })
  }
*/
}
