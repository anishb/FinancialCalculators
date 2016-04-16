function InterestCalculator(principal, rate) {
	this.principal = principal;
	this.nominalRate = rate;
	this.numCompoundsPerYear = 1; // default to yearly
	this.inflationRate = 0.02;
	var that = this;

	this.ratePerCompound = function() {
		return this.nominalRate / this.numCompoundsPerYear;
	}

	this.amountAfterYear = function(year) {
		var rate = 1 + that.ratePerCompound();
		return that.principal * Math.pow(rate, that.numCompoundsPerYear * year);
	}

	this.amountAfterInflation = function(year) {
		return that.amountAfterYear(year) / Math.pow(1 + that.inflationRate, year);
	}
}
