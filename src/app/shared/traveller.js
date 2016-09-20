"use strict";
var Traveller = (function () {
    function Traveller(personalAccidentLimit, medicalExpensesLimit, cancellationLimit, baggagePropertyLimit, name, dateOfBirth, winterSportsCover, scubadivingCover, motocycleCover, beneficiaryName, beneficiaryShare, articleItems) {
        this.personalAccidentLimit = personalAccidentLimit;
        this.medicalExpensesLimit = medicalExpensesLimit;
        this.cancellationLimit = cancellationLimit;
        this.baggagePropertyLimit = baggagePropertyLimit;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.winterSportsCover = winterSportsCover;
        this.scubadivingCover = scubadivingCover;
        this.motocycleCover = motocycleCover;
        this.beneficiaryName = beneficiaryName;
        this.beneficiaryShare = beneficiaryShare;
        this.articleItems = articleItems;
    }
    Traveller.asTraveller = function (json) {
        var obj = new Traveller(json["personalAccidentLimit"], json["medicalExpensesLimit"], json["cancellationLimit"], json["baggagePropertyLimit"], json["name"], json["dateOfBirth"], json["winterSportsCover"], json["scubadivingCover"], json["motocycleCover"], json["beneficiaryName"], json["beneficiaryShare"]);
        obj.articleItems = TravelArticle.asTravelArticleCollection(json["articleItems"]);
        return obj;
    };
    Traveller.asTravellerCollection = function (jsonArray) {
        return jsonArray.map(function (data) { return Traveller.asTraveller(data); });
    };
    return Traveller;
}());
exports.Traveller = Traveller;
var TravelArticle = (function () {
    function TravelArticle(articleTypeId, sumInsured, description, serialNumber) {
        this.articleTypeId = articleTypeId;
        this.sumInsured = sumInsured;
        this.description = description;
        this.serialNumber = serialNumber;
    }
    TravelArticle.asTravelArticle = function (json) {
        var obj = new TravelArticle(json["articleTypeId"], json["sumInsured"], json["description"], json["serialNumber"]);
        return obj;
    };
    TravelArticle.asTravelArticleCollection = function (jsonArray) {
        return jsonArray.map(function (data) { return TravelArticle.asTravelArticle(data); });
    };
    return TravelArticle;
}());
exports.TravelArticle = TravelArticle;
var TravelQuote = (function () {
    function TravelQuote(productCode, riskType, quoteDate, affinityId, hasMedicalConditions, hasMedicalTreatment, travelCancellationNeeded, hasClaimsAndPolicyHistory, adultsUnder75, childrenUnder16, policyStartDate, policyExpiryDate, quoteId, userId, userEmail, isComepleted, travelType, travelStartDate, travelEndDate, description, numberOfDaysRequiredInPolicyTerm, premiumAmount, 
        /*public discounts?: Discounts[],
        public selectedInstallmentOption?: InstallmentOption[],
        public paymentInfo?: PaymentInfo,*/
        travelers) {
        if (productCode === void 0) { productCode = 'TLA'; }
        if (quoteDate === void 0) { quoteDate = new Date(); }
        if (affinityId === void 0) { affinityId = 0; }
        if (hasMedicalConditions === void 0) { hasMedicalConditions = false; }
        if (hasMedicalTreatment === void 0) { hasMedicalTreatment = false; }
        if (travelCancellationNeeded === void 0) { travelCancellationNeeded = false; }
        if (hasClaimsAndPolicyHistory === void 0) { hasClaimsAndPolicyHistory = false; }
        if (adultsUnder75 === void 0) { adultsUnder75 = 1; }
        if (childrenUnder16 === void 0) { childrenUnder16 = 0; }
        this.productCode = productCode;
        this.riskType = riskType;
        this.quoteDate = quoteDate;
        this.affinityId = affinityId;
        this.hasMedicalConditions = hasMedicalConditions;
        this.hasMedicalTreatment = hasMedicalTreatment;
        this.travelCancellationNeeded = travelCancellationNeeded;
        this.hasClaimsAndPolicyHistory = hasClaimsAndPolicyHistory;
        this.adultsUnder75 = adultsUnder75;
        this.childrenUnder16 = childrenUnder16;
        this.policyStartDate = policyStartDate;
        this.policyExpiryDate = policyExpiryDate;
        this.quoteId = quoteId;
        this.userId = userId;
        this.userEmail = userEmail;
        this.isComepleted = isComepleted;
        this.travelType = travelType;
        this.travelStartDate = travelStartDate;
        this.travelEndDate = travelEndDate;
        this.description = description;
        this.numberOfDaysRequiredInPolicyTerm = numberOfDaysRequiredInPolicyTerm;
        this.premiumAmount = premiumAmount;
        this.travelers = travelers;
    }
    /*static asBlogEntries(jsonArray: Array<Object>) {
        return jsonArray.map((datum) => BlogEntry.asBlogEntry(datum));
    }*/
    TravelQuote.asTravelQuote = function (json) {
        var obj = new TravelQuote(json["productCode"], json["riskType"], json["quoteDate"], json["affinityId"], json["hasMedicalConditions"], json["hasMedicalTreatment"], json["travelCancellationNeeded"], json["hasClaimsAndPolicyHistory"], json["adultsUnder75"], json["childrenUnder16"], json["policyStartDate"], json["policyExpiryDate"], json["quoteId"], json["userId"], json["userEmail"], json["isComepleted"], json["travelType"], json["travelStartDate"], json["travelEndDate"], json["description"], json["numberOfDaysRequiredInPolicyTerm"], json["premiumAmount"]);
        obj.travelers = Traveller.asTravellerCollection(json["travelers"]);
        return obj;
    };
    TravelQuote.asTravelQuoteCollection = function (jsonArray) {
        return jsonArray.map(function (data) { return TravelQuote.asTravelQuote(data); });
    };
    return TravelQuote;
}());
exports.TravelQuote = TravelQuote;
//# sourceMappingURL=traveller.js.map