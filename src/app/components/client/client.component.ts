import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ServiceListService } from './servicelist.service';
import {  Observable } from 'rxjs';
import { Service } from '../../model/services.model';
import { doc } from '../../model/doc.model';
import{Inscription}from '../../model/inscription.model'
import { InscriptionService } from './inscription.service';
import{HttpClient}from'@angular/common/http'
import { subscriptiondocService } from './subscriptiondoc.service';
interface piece {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  page = 1;
  form1:FormGroup;
  form2:FormGroup;
  form3:FormGroup;
  forms:FormGroup[];
  piece: piece[] = [
    {value: 'CIN', viewValue: 'CIN'},
    {value: 'passeport', viewValue: 'passeport'},
    {value: 'carte séjour', viewValue: 'carte séjour'}
  ];
  // inscription:inscription|null;
  services: Service[] | null;
  selectedServices: Service[] = [];

  doc:doc[]|null;

  constructor(
    private _formBuilder: FormBuilder,
    private serviceListService: ServiceListService,
    public InscriptionService:InscriptionService,
    private http:HttpClient,
    private doclist: subscriptiondocService,
  ) {
    this.services = null;
    this.doc=null;

    this.doclist.loadServicess().subscribe(
      (data:doc[])=>{
        this.doc=data;
      }
    );
    this.serviceListService.loadServices().subscribe(
      (data: Service[]) => {
        this.services = data;
      }
    );
    this.form1 = this._formBuilder.group({
      name: ['', Validators.required],
      lastname:['', Validators.required],
      numtel:['',Validators.required],
      adresseemail:['',Validators.required],
      pjControl:['',Validators.required],
     // dateexp:['', Validators.required],
    /*  adresse:['',Validators.required],
      typead:['',Validators.required],
      nmpiece:['',Validators.required],
      */
    });


    this.form2 = this._formBuilder.group({
      services: []
    });

    this.form3 = this._formBuilder.group({});

    this.forms = [this.form1, this.form2, this.form3];
  }

  public addService(service: Service) {
    console.log(service);
    const index = this.selectedServices.indexOf(service);
    if(index > -1) {
      this.selectedServices.splice(index, 1);
    } else {
      this.selectedServices.push(service);
    }
  }

  public adddoc(doc:any){
    console.log(doc);
  }

  public getFinalPrice(): number {
    return this.selectedServices.reduce((acc, currentService) => acc + currentService.price, 0)
  }

  public next() {
    // console.log(this.form1);
    this.page === 2 && this.submit();
    this.page < 3 && this.page++;
  }

  public back() {
    this.page -= 1;
  }

  submit() {
    debugger;
    const { name, lastname, numtel, adresseemail, pjControl } = this.form1.value;

    const formObj = {
      name,
      lastname,
      numtel,
      adresseemail,
      pjControl
    };

    console.log(formObj);
    this.InscriptionService.create(formObj).subscribe(res => {
      console.log('subscription sent successfully!');
      console.log(res);
    })
  }
}
