describe("Rent or Buy calculator", function() {
	var calculator;
	var that = this;

	Number.prototype.round = function(places) {
		return Math.round(this * Math.pow(10, places)) / Math.pow(10, places);
	};

	beforeEach(function() {
		that.calculator = new RentOrBuyCalculator();
		that.calculator.purchasePrice = 500000;
		that.calculator.downPayment = 100000;
		that.calculator.mortgageRate = 0.05;
		that.calculator.mortgageTerm = 30;
		that.calculator.propertyTaxRate = 0.0145;
		that.calculator.monthlyHOAFees = 400;
		that.calculator.annualInsurance = 260;
		that.calculator.annualAppreciation = 0.02;
		that.calculator.annualMaintenance = 500;
		that.calculator.inflationRate = 0.02;
		that.calculator.marginalTaxRate = 0.25;
		that.calculator.monthlyRent = 2350;
		that.calculator.annualRentInflation = 0.02;
		that.calculator.investmentReturnRate = 0.04;
		that.calculator.start();
	});

	it("calculates home value", function() {
		expect(that.calculator.homeValue(50).round(2)).toEqual(543414.33);
	});
});