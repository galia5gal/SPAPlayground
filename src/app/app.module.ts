import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './shared';
import { SessionService } from './shared';
import { LabelsErrorsService } from './shared';
import { routing } from './app.routing';
import {TravellersFormComponent} from './quote/travellers/travellers-form.component';
import {CoverageFormComponent} from './quote/coverage/coverage-form.component';
import {SummaryFormComponent} from './quote/summary/summary-form.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    TravellersFormComponent,
    CoverageFormComponent,
    SummaryFormComponent
  ],
  providers: [
    ApiService,
    SessionService,
    LabelsErrorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
