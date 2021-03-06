import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoixComponent } from './components/choix/choix.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
const routes: Routes=[
  {path: 'choix', component: ChoixComponent},
  {path:'',component: AcceuilComponent},
  {path:'sign-up',component:SignUpComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
