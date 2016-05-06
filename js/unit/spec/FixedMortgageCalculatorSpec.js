describe("Fixed Mortgage Calculator", function() {
	var calculator;
	var zeroCalculator;
	var that = this;

	Number.prototype.round = function(places) {
		return Math.round(this * Math.pow(10, places)) / Math.pow(10, places);
	};

	beforeEach(function() {
		that.calculator = new FixedMortgageCalculator(400000, 30, 0.05);
		that.zeroCalculator = new FixedMortgageCalculator(0, 30, 0.05);
	});

	it("calculates number of months", function() {
		expect(that.calculator.months()).toEqual(360);
	});

	it("calculates monthly interest", function() {
		expect(that.calculator.monthlyInterest().round(5)).toEqual(0.00417);
	});

	it("calculates monthly payments", function() {
		expect(that.calculator.monthlyPayment().round(2)).toEqual(2147.29);
		expect(that.zeroCalculator.monthlyPayment().round(2)).toEqual(0);
	});

	it("calculates monthly balance", function() {
		expect(that.calculator.balance(177).round(2)).toEqual(274558.08);
		expect(that.zeroCalculator.balance(177).round(2)).toEqual(0);
	});

	it("calculates interest payment for a given month", function() {
		expect(that.calculator.interestPayment(177).round(2)).toEqual(1148.16);
		expect(that.zeroCalculator.interestPayment(177).round(2)).toEqual(0);
	});

	it("calculates principal payment for a given month", function() {
		expect(that.calculator.principalPayment(177).round(2)).toEqual(999.13);
		expect(that.zeroCalculator.principalPayment(177).round(2)).toEqual(0);
	});
});