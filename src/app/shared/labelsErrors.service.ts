import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Label } from './label';
import { Error } from './error';
import { Config } from './config';


@Injectable()
export class LabelsErrorsService {
    //private serviceUrl: string = Config.getEnvironmentVariable('localEndPoint') + '/CMSPages/PlayWebService.asmx';
    private serviceUrl: string = Config.getEnvironmentVariable('localEndPoint') + 'util';
    travelLabels = [];
    travelErrors = [];

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
    
      getAllLabels(): Observable<Label[]>{
        console.log("the labels end point URL " + this.serviceUrl+'/labels'); 
        //var test = this.http.get(this.serviceUrl+'/labels'); 
        //console.log(test); 
        let labelServiceUrl = this.serviceUrl + '/labels';
        let label$ = this.http
        //.get('${this.serviceUrl}/labels', {headers: this.getHeaders()})
        .get(labelServiceUrl)
        .map(this.mapLabels)
        .catch(this.handleError);
        return label$;
    }

    getAllErrors(): Observable<Error[]>{
        console.log(this.serviceUrl+'/Errors'); 
        
        //var test = this.http.get(this.serviceUrl+'/errorMessages'); 
        //console.log(test); 
        let errorServiceUrl = this.serviceUrl + '/errorMessages';
        let error$ = this.http
        //.get('${this.serviceUrl}/Errors', {headers: this.getHeaders()})
        .get(errorServiceUrl)
        .map(this.mapErrors)
        .catch(this.handleError);
        return error$;
    }

      private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('body', '');
        return headers;
    }

    addTolabels(label: Label): void {
        this.travelLabels[label.key] = label;
    }

    mapLabels(response:Response): Label[]{
        let body = response.json();
        // convert the returned jason into observable collection of Label
        return body.map(toLabel) || { };
    }

     mapErrors(response:Response): Error[]{
    	let body = response.json();
        return body.map(toError) || {};
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

function toLabel(r:any): Label{
  let label = <Label>({
    key: r.key,
    heading: r.heading,
    helpInfo: r.helpInfo,
    text: r.text
  });
  console.log('Parsed label:', label);
  return label;
}

function toError(r:any): Error{
  let error = <Error>({
    key: r.key,
    value: r.value
  });
  console.log('Parsed error:', error);
  return error;
}
