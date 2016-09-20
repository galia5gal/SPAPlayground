import { Injectable } from '@angular/core';
import { NavigationItem } from './navigationItem';

@Injectable()
export class NavigationConfig {
     navigationMap = {};

     constructor(){

         this.navigationMap['Products/Individual-and-Family/Travel/Quote/Travellers'] = [
             new NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
             new NavigationItem('Coverage', 'Coverage', '', true),
             new NavigationItem('Summary', 'Quote', '', true)
         ];

         this.navigationMap['Products/Individual-and-Family/Travel/Quote/Travellers/:quoteId'] = [
             new NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
             new NavigationItem('Coverage', 'Coverage', '', true),
             new NavigationItem('Summary', 'Quote', '', true)
         ]

         this.navigationMap['Products/Individual-and-Family/Travel/Quote/Coverage'] = [
             new NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
             new NavigationItem('Coverage', 'Coverage', 'Products/Individual-and-Family/Travel/Quote/Coverage', false),
             new NavigationItem('Summary', 'Quote', '', true)
         ]
         this.navigationMap['Products/Individual-and-Family/Travel/Quote/Coverage/:quoteId'] = [
             new NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
             new NavigationItem('Coverage', 'Coverage', 'Products/Individual-and-Family/Travel/Quote/Coverage', false),
             new NavigationItem('Summary', 'Quote', '', true)
         ]

         this.navigationMap['Products/Individual-and-Family/Travel/Quote/Summary'] = [
             new NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
             new NavigationItem('Coverage', 'Coverage', 'Products/Individual-and-Family/Travel/Quote/Coverage', false),
             new NavigationItem('Summary', 'Quote', 'Products/Individual-and-Family/Travel/Quote/Summary', false)
         ]

         this.navigationMap['Products/Individual-and-Family/Travel/Quote/Summary/:quoteId'] = [
             new NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
             new NavigationItem('Coverage', 'Coverage', 'Products/Individual-and-Family/Travel/Quote/Coverage', false),
             new NavigationItem('Summary', 'Quote', 'Products/Individual-and-Family/Travel/Quote/Summary', false)
         ]
     }

     getNavgationMap(key: string, params: {}){
         let size = Object.keys(params).length;
         let navItems = this.navigationMap[key];
         if(size==0) return navItems;
         navItems.forEach(element => {
             element.url = element.url+"/"+params['quoteId'];
         });
         
     }

}