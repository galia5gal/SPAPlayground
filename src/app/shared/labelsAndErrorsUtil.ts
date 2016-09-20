import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Label } from './label';
import { Error } from './error';
import { LabelsErrorsService } from './labelsErrors.service';

@Injectable()
export class LabelsAndErrorsUtil {

    labels = {};
    errors = {};
    errorMessage: string = '';
    isLabelsLoading: boolean = true;
    isErrorsLoading: boolean = true;


    constructor(private labelsErrors: LabelsErrorsService){
      
        labelsErrors.getAllLabels().subscribe(res=>{
          if(res){
            res.forEach((l) =>{
              this.labels[l.key]=l;
              console.log('associative array:', this.labels[l.key].heading);
            });
            }
          },
          e => this.errorMessage = e,
         () => this.isLabelsLoading = false
      );
      //console.log("Labels in LabelsErrorsService" + this.labels['travelHasMedicalConditions']);

      
      labelsErrors.getAllErrors().subscribe(res=>{
          if(res){
              res.forEach((l) =>{
                this.errors[l.key]=l.value;
            });
          }
        }
      );
    }
}