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
		that.calculator.setup();
	});

	it("calculates home value", function() {
		expect(that.calculator.homeValue(50).round(2)).toEqual(543414.33);
		that.calculator.downPayment = 500000;
		that.calculator.setup();
		expect(that.calculator.homeValue(10).round(2)).toEqual(508396.11);
	});

	it("calculates equity", function() {
		expect(that.calculator.equity(50).round(2)).toEqual(170070.35);
		that.calculator.downPayment = 500000;
		that.calculator.setup();
		expect(that.calculator.equity(10).round(2)).toEqual(508396.11);
	});

	it("calculates insurance expense", function() {
		expect(that.calculator.insurance(50).round(2)).toEqual(23.45);
	});

	it("calculates HOA fees", function() {
		expect(that.calculator.hoaFees(50).round(2)).toEqual(432.97);
	});

	it("calculates maintenance expense", function() {
		expect(that.calculator.maintenance(50).round(2)).toEqual(45.10);
	});

	it("calculates property tax", function() {
		expect(that.calculator.propertyTax(50).round(2)).toEqual(655.53);
		that.calculator.downPayment = 500000;
		that.calculator.setup();
		expect(that.calculator.propertyTax(10).round(2)).toEqual(613.29);
	});

	it("calculates income tax savings", function() {
		expect(that.calculator.incomeTaxSavings(50).round(2)).toEqual(553.40);
		that.calculator.downPayment = 500000;
		that.calculator.setup();
		expect(that.calculator.incomeTaxSavings(10).round(2)).toEqual(153.32);
	});

	it("calculates total expenses for owning", function() {
		expect(that.calculator.totalExpenseForHome(50).round(2)).toEqual(2750.95);
		that.calculator.downPayment = 500000;
		that.calculator.setup();
		expect(that.calculator.totalExpenseForHome(10).round(2)).toEqual(923.30);
	});

	it("calculates cash after selling home", function() {
		expect(that.calculator.cashAfterSellingHome(50).round(2)).toEqual(137465.49);
		that.calculator.downPayment = 500000;
		that.calculator.setup();
		expect(that.calculator.cashAfterSellingHome(10).round(2)).toEqual(477892.35);
	});

	it("calculates rent", function() {
		expect(that.calculator.rent(50).round(2)).toEqual(2543.72);
	});

	it("calculates savings from renting", function() {
		expect(that.calculator.savingsFromRenting(50).round(2)).toEqual(207.23);
		that.calculator.downPayment = 500000;
		that.calculator.setup();
		expect(that.calculator.savingsFromRenting(10).round(2)).toEqual(-1426.70);
	});

	it("calculates cash when renting", function() {
		expect(that.calculator.cashWhenRenting(50).round(2)).toEqual(132554.66);
		that.calculator.downPayment = 500000;
		that.calculator.setup();
		expect(that.calculator.cashWhenRenting(10).round(2)).toEqual(502400.97);
	});

	it("calculates months till owning is better", function() {
		expect(that.calculator.monthsTillWorthOwning()).toEqual(44);
		that.calculator.downPayment = 500000;
		that.calculator.setup();
		expect(that.calculator.monthsTillWorthOwning()).toEqual(50);
	});
});