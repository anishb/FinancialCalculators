describe("Interest Calculator", function() {
	var calculator;
	var that = this;

	Number.prototype.round = function(places) {
		return Math.round(this * Math.pow(10, places)) / Math.pow(10, places);
	}

	beforeEach(function() {
		that.calculator = new InterestCalculator(10000, 0.05);
		that.calculator.numCompoundsPerYear = 12;
	});

	it("calculates correct monthly rate", function() {
		expect(that.calculator.ratePerCompound().round(5)).toEqual(0.00407);
	});

	it("calculates correct amount after n years", function() {
		expect(that.calculator.amountAfterYear(0).round(2)).toEqual(10000.00);
		expect(that.calculator.amountAfterYear(10).round(2)).toEqual(16288.95);
	});

	it("correctly adjusts for inflation after n years", function() {
		expect(that.calculator.amountAfterInflation(0).round(2)).toEqual(10000.00);
		expect(that.calculator.amountAfterInflation(10).round(2)).toEqual(13362.61);
	});
});
