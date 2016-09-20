/* Using this article as a starting point. Based on reactive/model-driven forms approach http://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html#adding-validators*/
import { Component, OnInit } from '@angular/core';
import { TravelQuote }    from './../../shared/traveller';
import { Validators } from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from './../../shared/session.service';
import { LabelsErrorsService } from './../../shared/labelsErrors.service';
import { Label } from './../../shared/label';
import {LabelsAndErrorsUtil} from './../../shared/LabelsAndErrorsUtil';

@Component({
  selector: 'travellers-form',
  directives: [REACTIVE_FORM_DIRECTIVES],
  templateUrl: './travellers-form.component.html',
  providers: [LabelsAndErrorsUtil]
})

export class TravellersFormComponent implements OnInit   {
    quoteId: string;
    affinityId: string;
    productCode: string;
    travelForm: FormGroup;
    model: TravelQuote; /* = new TravelQuote('TLA', 'A', new Date(), 0, false, false, false, false, 0 );*/
    errorMessage = '';
    submitted = false;
    //allowNext = !this.model.hasClaimsAndPolicyHistory && this.model.hasClaimsAndPolicyHistory
    title = "Tell us a bit about the travellers";
    
    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
    get formDiagnostic() {return JSON.stringify(this.travelForm.value); }
    formData: string;
    active = true;
    labels: Label[];
    isLoading: boolean = true;

    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private sessionService: SessionService, 
      private labelsErrors: LabelsAndErrorsUtil) {
        
    }

    collectDataFromQuery(queryParams){
      this.affinityId = queryParams["affinityId"];
      this.productCode = queryParams["productCode"]
    }

    ngOnInit() {
        // 1. attemps get affinityID and productCode from query string
        this.router.routerState.queryParams.subscribe(queryParams=> 
          this.collectDataFromQuery(queryParams)
          //this.affinityId = queryParams["affinityId"] this.productCode = queryParams["productCode"]
      );

      if(this.affinityId !=null && this.productCode!=null){
        // TODO: get TravelQuote Template
        this.model = new TravelQuote('TRAVELANN', 'TRAVELANN’', new Date(), 0, false, false, false, false, 1, 0 );
        this.model.riskType = this.model.productCode=='TRAVELANN'?'TRAVELANN’':'TRAVELST';
        this.model.affinityId = Number.parseInt(this.affinityId);
        this.model.productCode = this.productCode;
      }
      // 2. Take the model based on quoteId
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

      //3. Finally get the model from session
      if(this.model==null || this.model==undefined) this.model = this.sessionService.get('travelQuote');

        /*
        this.router.routerState.queryParams.subscribe(queryParams=> 
          this.quoteId = queryParams["quoteId"]
        );
        */

      if(this.model != null)
      {
	      this.travelForm = this.formBuilder.group({
        hasMedicalConditions: [this.model.hasMedicalConditions, TravellersFormComponent.validateNo],
        hasMedicalTreatment: [this.model.hasMedicalTreatment, TravellersFormComponent.validateNo],
        travelCancellationNeeded: [this.model.travelCancellationNeeded, TravellersFormComponent.validateNo],
        hasClaimsAndPolicyHistory: [this.model.hasClaimsAndPolicyHistory, TravellersFormComponent.validateNo],
        adultsUnder75: [this.model.adultsUnder75, Validators.required],
        childrenUnder16: [this.model.childrenUnder16, Validators.required], 
        quoteId: this.model.quoteId,
        travelType: this.model.travelType,
        affinityId: this.model.affinityId, 
        riskType: this.model.riskType,
        quoteInfo: this.formBuilder.group({
          productCode: [this.model.productCode, Validators.required]
          })
        });
        this.travelForm.valueChanges.subscribe(data => this.formData=JSON.stringify(data));  
      }
      // If here, redirect to travel landing page (?????)

      /*
      if(this.quoteId!=null)
      {
        this.model = new TravelQuote('TRAVELANN', 'A', new Date(), 0, false, false, false, false, 1, 0 );
        this.model.quoteId = this.quoteId;
        this.model.riskType = this.model.productCode=='TRAVELANN'?'TRAVELANN’':'TRAVELST';
      }
      else
      {
          // Get the affinityId, productCode and travel type and call web service to get travel template
          this.model = new TravelQuote('TLA', 'A', new Date(), 0, false, false, false, false, 1, 0 );
          this.activatedRoute.params.subscribe(params => {
          let affinityId = Number.parseInt(params['affinityId']);
          let productCode = params['productCode'];
          let travelType = params['travelType'];
          this.model.affinityId = affinityId!=null ? affinityId : 0;
          this.model.productCode = productCode!=null ? productCode : this.model.productCode;
          this.model.riskType = this.model.productCode=='TLA'?'Annual':'Short Term';
          this.model.travelType = travelType!=null ? travelType : this.model.travelType;
        });
      }
      */
      
    }

    static validateNo(c: FormControl) {
      if (c.value==true) {
        return {"invalidTrueValue":true};
      }
      return null;
    }
    
    onSubmit() { 
      //this.formData = this.travelForm.value; 
      //this.model.adultsUnder75 = this.travelForm.controls["adultsUnder75"].value;
      //this.model.childrenUnder16 = this.travelForm.controls["childrenUnder16"].value;
      // TODO: Save on the DB the quote
      this.model.quoteId = '1214daweqw';
      var hasKey = this.sessionService.has('travelQuote');
      this.sessionService.set('travelQuote', this.model);
      this.router.navigate(['Products/Individual-and-Family/Travel/Quote/Coverage', this.model.quoteId]);
      // On succes navigate to the next step
      /*if(this.model.quoteId!=null)
        this.router.navigate(['Products/Individual-and-Family/Travel/Quote/Coverage'], { queryParams: { quoteId:this.model.quoteId}});
      
      else if(this.model.travelType!=null)
        this.router.navigate(['Products/Individual-and-Family/Travel/Quote/Coverage', this.model.affinityId, this.model.productId, this.model.travelType]);
      else
        this.router.navigate(['Products/Individual-and-Family/Travel/Quote/Coverage', this.model.affinityId, this.model.productId]);*/
    }
}
