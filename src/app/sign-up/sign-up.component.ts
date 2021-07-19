import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FileUploader } from 'ng2-file-upload';
import { ChoixService } from 'src/app/components/choix/choix service/choix.service';
interface piece {
  value: string;
  viewValue: string;
}
export enum TypeEnum {
  CANDIDAT="R",
  ENTREPRISE="C",
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  myFiles:string [] = [];
  myFilesClient:string  [] = [];
  type: string;
  typeEnum = TypeEnum;
  services: any;
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
  formClient=new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    numtel:new FormControl('', Validators.required),
    adresseemail: new FormControl('', Validators.required),
    pjControl:new FormControl('', Validators.required),
    dateexp: new FormControl('', Validators.required),
  })
  formEntreprise=new FormGroup({
   name:  new FormControl('', Validators.required),
  lastname: new FormControl('', Validators.required),
  numtel: new FormControl('', Validators.required),
  adresseemail: new FormControl('', Validators.required),
  pjControl: new FormControl('', Validators.required),
 dateexp: new FormControl('', Validators.required),
 numpiece: new FormControl('', Validators.required),
 adresse: new FormControl('', Validators.required),
})
formEntreprise2=new FormGroup({
  nameprof : new FormControl('', Validators.required),
  lastnameprof: new FormControl('', Validators.required),
  numtelprof: new FormControl('', Validators.required),
  adresseprof: new FormControl('', Validators.required),
  adressemailprof: new FormControl('', Validators.required),
})
formClientDocs=new FormGroup({
  files: new FormControl('', [Validators.required])
})
formEntrepriseDocs=new FormGroup({
  file: new FormControl('', [Validators.required])
})
  submitted = false;
  submitted2 = false;
  submitted3 = false;
  submitted4 = false;

  submitted7 = false;
  submitted6 = false;
  submitted5 = false;



  constructor(
    private inscriptionService: SignUpService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service:ChoixService,
  ) {

    this.type = this.service.getChoix();
    console.log("le type",this.type);
        this.var = true;
    this.forms = [this.formClient];
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
  get f(){
    return this.formEntrepriseDocs.controls;
  }
  onFileChange(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
    }
    console.log("mes fiuchiers ",this.myFiles);
}
onFileChanges(event: any) {

  for (var i = 0; i < event.target.files.length; i++) {
      this.myFilesClient.push(event.target.files[i]);

  }
  console.log("mes fichiers ",this.myFilesClient);
}

  public next() {
    if (this.page == 0 && !this.formClient.valid || this.page == 1 && this.selectedServices.length==0|| this.page == 2 && this.myFilesClient.length==0)
    {return;}

    else{this.page < 2 && this.page++;}
   if ( this.page==2){this.postrequestClient();}

  }
public next2() {
  if(this.page == 0 && !this.formEntreprise.valid ||
    this.page == 1 && !this.formEntreprise2.valid || this.page == 2 && this.selectedServices.length==0 || this.page==3 && this.myFiles.length==0)
    {return; }
    else {this.page<3 && this.page++;}
    if (this.page==3){this.postrequestEntrerise()}
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
   submit()
   {



    this.submitted=true;
    console.log("page0", this.submitted);
    console.log("page1", this.submitted2);
    if(this.page==1)
    {this.submitted2=true;    console.log("pagehedhi", this.submitted2)};
    if(this.page==2)
    {this.submitted3=true;    console.log("pagehedhi3", this.submitted3)};
    if(this.page==3)
    {this.submitted4=true;    console.log("pagehedhi3", this.submitted3)};
  }
submit2 (){
  this.submitted7=true;
  console.log("page0", this.submitted);
  console.log("page1", this.submitted2);
  if(this.page==1)
  {this.submitted5=true;    console.log("pagehedhi", this.submitted2)};
  if(this.page==2)
  {this.submitted6=true;    console.log("pagehedhi3", this.submitted3)};

 }
 postrequestClient(){

  const { name, lastname, numtel, adresseemail, pjControl } = this.formClient.value;

 const formObj = {
   name,
   lastname,
   numtel,
   adresseemail,
   pjControl,
   selectedServices:this.selectedServices,
   myFilesClient:this.myFilesClient,
 };

 console.log(formObj);
 this.inscriptionService.create(formObj).subscribe(res => {
   console.log('subscription sent successfully!');
   console.log(res);
 })

 }
 postrequestEntrerise(){
  //  debugger;
    const { name, lastname, numtel, adresseemail, pjControl } = this.formEntreprise.value;
    const{nameprof, lastnameprof, numtelprof,adressemailprof,adresseprof}=this.formEntreprise2.value;

    const formObj = {
      name,
      lastname,
      numtel,
      adresseemail,
      pjControl,
      nameprof,
      lastnameprof,
      numtelprof,
      adressemailprof,
      adresseprof,
      selectedServices:this.selectedServices,
      myFiles:this.myFiles,
    };

    console.log(formObj);
    this.inscriptionService.create(formObj).subscribe(res => {
      console.log('subscription sent successfully!');
      console.log(res);
    })
  }


}
