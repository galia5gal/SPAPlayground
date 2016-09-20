import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Config } from './config';
import { TravelQuote } from './traveller';

@Injectable()
export class LabelsErrorsService {
    //private serviceUrl: string = Config.getEnvironmentVariable('endPoint') + '/CMSPages/PlayWebService.asmx';
    private serviceUrl: string = Config.getEnvironmentVariable('endPoint') + '/util';
    
    constructor(private http : Http){
      /*
      this.getAllLabels().subscribe(res=>{
          if(res){
            res.forEach((l) =>{
              this.travelLabels[l.labelKey]=l.labelValue;
            });
            }
          }
      );
      console.log("Labels in LabelsErrorsService" + this.travelLabels);

      this.getAllErrors().subscribe(res=>{
          if(res){
              res.forEach((l) =>{
                this.travelErrors[l.errorKey]=l.errorValue;
            });
          }
        }
      );
      */
    }

    getTravelQuote(quoteId: string): Observable<TravelQuote>{
        
        var test = this.http.get(this.serviceUrl+'/labels'); 
        console.log(test); 

        let travelQuote$ = this.http
        .get(`${this.serviceUrl}/quote/travel/`+ quoteId, {headers: this.getHeaders()})
        .map(this.mapTravelQuote)
        .catch(this.handleError);
        return travelQuote$;
    }

    mapTravelQuote(response:Response): TravelQuote {
        if(response.status==400 || response.status==404 || response.status==500)
            throw new Error('Status: ' + response.status + "; Message:" + response.json());
        let body = response.json();
        /*let travelQuote = <TravelQuote>({
            productCode: body.productCode,
            riskType: body.riskType,
            quoteDate: body.quoteDate,
            affinityId: body.affinityId,
            hasMedicalConditions: body.hasMedicalConditions,
            hasMedicalTreatment: body.hasMedicalTreatment,
            travelCancellationNeeded: body.travelCancellationNeeded,
            hasClaimsAndPolicyHistory: body.hasClaimsAndPolicyHistory,
            adultsUnder75: body.adultsUnder75,
            childrenUnder16: body.childrenUnder16,
            policyStartDate: body.policyStartDate,
            quoteId: body.quoteId,
            userId: body.userId,
            userEmail: body.userEmail,
            isComepleted: body.isComepleted,
            travelType: body.travelType,
            travelStartDate: body.travelStartDate,
            travelEndDate: body.travelEndDate,
            description: body.description,
            numberOfDaysRequiredInPolicyTerm: body.numberOfDaysRequiredInPolicyTerm,
            premiumAmount: body.premiumAmount
        });*/
        let travelQuote = TravelQuote.asTravelQuote(body);
        console.log('Parsed Travel Object:', travelQuote);
        return travelQuote;
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // TOD: Dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}