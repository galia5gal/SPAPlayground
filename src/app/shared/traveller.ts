export class Traveller {
  constructor(
    public personalAccidentLimit: number,
    public medicalExpensesLimit: number,
    public cancellationLimit: number,
    public baggagePropertyLimit: number,
    public name?: string,
    public dateOfBirth?: Date,
    public winterSportsCover?: boolean,
    public scubadivingCover?: boolean,
    public motocycleCover?: boolean,
    public beneficiaryName?: string,
    public beneficiaryShare?: number,
    
    public articleItems?: TravelArticle[]
  ) {  }

  static asTraveller(json: Object) {
        let obj = new Traveller(json["personalAccidentLimit"], json["medicalExpensesLimit"], 
        json["cancellationLimit"], json["baggagePropertyLimit"], json["name"], json["dateOfBirth"], json["winterSportsCover"], json["scubadivingCover"],
        json["motocycleCover"], json["beneficiaryName"], json["beneficiaryShare"]);
        obj.articleItems = TravelArticle.asTravelArticleCollection(json["articleItems"]);
        return obj;
    }

    static asTravellerCollection(jsonArray: Array<Object>) {
        return jsonArray.map((data) => Traveller.asTraveller(data));
    }

}
export class TravelArticle{
    constructor(
        public articleTypeId: number,
        public sumInsured: number,
        public description: string,
        public serialNumber?: string
    ){}

    static asTravelArticle(json: Object) {
        let obj = new TravelArticle(json["articleTypeId"], json["sumInsured"], 
        json["description"], json["serialNumber"]);
        return obj;
    }

    static asTravelArticleCollection(jsonArray: Array<Object>) {
        return jsonArray.map((data) => TravelArticle.asTravelArticle(data));
    }
}

export class TravelQuote{
    constructor(
        public productCode: string='TLA',
        public riskType: string,
        public quoteDate: Date = new Date(),
        public affinityId: number = 0,
        public hasMedicalConditions: boolean=false,
        public hasMedicalTreatment: boolean=false,
        public travelCancellationNeeded: boolean=false,
        public hasClaimsAndPolicyHistory: boolean=false,
        public adultsUnder75: number=1,
        public childrenUnder16: number=0,
        public policyStartDate?: Date,
        public policyExpiryDate?: Date,
        public quoteId?: string,
        public userId?: string,
        public userEmail?: string,
        public isComepleted?:boolean,
        public travelType?: string,
        public travelStartDate?:Date,
        public travelEndDate?:Date,
        public description?:string,
        public numberOfDaysRequiredInPolicyTerm?:number,
        public premiumAmount?:number,
        /*public discounts?: Discounts[],
        public selectedInstallmentOption?: InstallmentOption[],
        public paymentInfo?: PaymentInfo,*/
        public travelers?: Traveller[]
    )
    {
        
    }

    /*static asBlogEntries(jsonArray: Array<Object>) {
        return jsonArray.map((datum) => BlogEntry.asBlogEntry(datum));
    }*/

    static asTravelQuote(json: Object) {
        let obj = new TravelQuote(json["productCode"], json["riskType"], 
        json["quoteDate"], json["affinityId"], json["hasMedicalConditions"], json["hasMedicalTreatment"], json["travelCancellationNeeded"], json["hasClaimsAndPolicyHistory"],
        json["adultsUnder75"], json["childrenUnder16"], json["policyStartDate"], json["policyExpiryDate"], json["quoteId"], json["userId"],
        json["userEmail"], json["isComepleted"], json["travelType"], json["travelStartDate"], json["travelEndDate"], json["description"],
        json["numberOfDaysRequiredInPolicyTerm"], json["premiumAmount"]);
        obj.travelers = Traveller.asTravellerCollection(json["travelers"]);
        return obj;
    }

    static asTravelQuoteCollection(jsonArray: Array<Object>) {
        return jsonArray.map((data) => TravelQuote.asTravelQuote(data));
    }

}

