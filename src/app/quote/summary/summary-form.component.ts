import { Component, OnInit } from '@angular/core';
import { TravelQuote }    from './../../shared/traveller';
import { Validators } from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from './../../shared/session.service';


@Component({
  selector: 'coverage-form',
  directives: [REACTIVE_FORM_DIRECTIVES],
  templateUrl: './summary-form.component.html'
})

export class SummaryFormComponent implements OnInit   {
    travelForm: FormGroup;
    quoteId: string;
    model: TravelQuote; /* = new TravelQuote('TLA', 'A', new Date(), 0, false, false, false, false, 0 );*/
    errorMessage = 'Please Contact BF&M';
    submitted = false;

    get diagnostic() { return JSON.stringify(this.model); }
    title = "Here is your travel quote";
    
    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private sessionService: SessionService) {
      
    }

    ngOnInit() {
      this.model = this.sessionService.get('travelQuote');
       if(this.model==null || this.model===undefined){
        this.activatedRoute.params.subscribe(params => {
          this.quoteId = params['quoteId'];
          // TO DO: Get QuoteBy ID
          if(this.quoteId!=null){
            this.model = new TravelQuote('TRAVELANN', 'TRAVELANN’', new Date(), 5, false, false, false, false, 1, 0 );
            this.model.quoteId =  this.quoteId;
          }
        });
      }
      
    }

}