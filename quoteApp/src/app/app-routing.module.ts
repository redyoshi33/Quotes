import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WriteComponent } from './write/write.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
	{ path: "", component: HomeComponent},
	{ path: 'new', component: NewComponent},
	{ path: 'quotes/:id', component: QuotesComponent},
	{ path: 'write/:id', component: WriteComponent},
	{ path: 'edit/:id', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
