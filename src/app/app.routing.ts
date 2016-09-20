import { RouterModule, Routes } from '@angular/router';
import {TravellersFormComponent} from './quote/travellers/travellers-form.component';
import {CoverageFormComponent} from './quote/coverage/coverage-form.component';
import {SummaryFormComponent} from './quote/summary/summary-form.component';

const routes: Routes = [
  { path: 'Products/Individual-and-Family/Travel/Quote',  component: TravellersFormComponent },
  { path: 'Products/Individual-and-Family/Travel/Quote/NoQuote', component: TravellersFormComponent },
  { path: 'Products/Individual-and-Family/Travel/Quote/Travellers', component: TravellersFormComponent },
  { path: 'Products/Individual-and-Family/Travel/Quote/Travellers/:quoteId', component: TravellersFormComponent },
  { path: 'Products/Individual-and-Family/Travel/Quote/Coverage', component: CoverageFormComponent },
  { path: 'Products/Individual-and-Family/Travel/Quote/Coverage/:quoteId', component: CoverageFormComponent },
  { path: 'Products/Individual-and-Family/Travel/Quote/Summary', component: SummaryFormComponent },
  { path: 'Products/Individual-and-Family/Travel/Quote/Summary/:quoteId', component: SummaryFormComponent }
  /*{ path: 'Products/Individual-and-Family/Travel/Quote/Coverage/:affinityId', component: CoverageFormComponent},
  { path: 'Products/Individual-and-Family/Travel/Quote/Coverage/:affinityId/:productId', component: CoverageFormComponent },
  { path: 'Products/Individual-and-Family/Travel/Quote/Coverage/:affinityId/:productId/:travelType', component: CoverageFormComponent }*/
];

export const routing = RouterModule.forRoot(routes);
