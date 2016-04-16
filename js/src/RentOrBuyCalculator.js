function RentOrBuyCalculator() {
	var that = this;
	
	this.purchasePrice;
	this.downPayment;
	this.mortgageRate;
	this.mortgageTerm;
	this.propertyTaxRate = 0.0135;
	this.monthlyHOAFees;
	this.isHOATaxDeductible = false;
	this.annualInsurance;
	this.annualAppreciation = 0.02;
	this.annualMaintenance;
	this.inflationRate = 0.02;
	this.marginalTaxRate = 0.25;
	this.monthlyRent;
	this.annualRentInflation = 0.03;
	this.investmentReturnRate; // After taxes

	var mortgageCalculator;
	var sellingClosingRate = 0.06;
	var cashWhileRenting;

	this.setup = function() {
		var mortgageAmount = that.purchasePrice - that.downPayment;
		mortgageCalculator = new FixedMortgageCalculator(mortgageAmount, this.mortgageTerm,
			this.mortgageRate);
		cashWhileRenting = new Array(that.mortgageTerm * 12);
	};

	/* Owning scenario */
	this.homeValue = function(month) {
		return that.purchasePrice * Math.pow(1 + that.annualAppreciation / 12, month);
	};

	this.equity = function(month) {
		return that.homeValue(month) - mortgageCalculator.balance(month);
	};

	this.insurance = function(month) {
		return that.annualInsurance / 12.0 * Math.pow(1 + that.inflationRate, Math.floor(month / 12));
	};

	this.hoaFees = function(month) {
		return that.monthlyHOAFees * Math.pow(1 + that.inflationRate, Math.floor(month / 12));
	};

	this.maintenance = function(month) {
		return that.annualMaintenance / 12.0 * Math.pow(1 + that.inflationRate, Math.floor(month / 12));
	};

	this.propertyTax = function(month) {
		return that.homeValue(month - 1) * that.propertyTaxRate / 12;
	};

	this.incomeTaxSavings = function(month) {
		var deductible = mortgageCalculator.interestPayment(month) + that.propertyTax(month);
		if (that.isHOATaxDeductible) {
			deductible += that.hoaFees(month);
		}
		return deductible * that.marginalTaxRate;
	};

	this.totalExpenseForHome = function(month) {
		return mortgageCalculator.monthlyPayment() + that.insurance(month) + that.hoaFees(month)
			+ that.maintenance(month) + that.propertyTax(month) - that.incomeTaxSavings(month);
	};

	this.cashAfterSellingHome = function(month) {
		return that.homeValue(month) * (1 - sellingClosingRate)
			- mortgageCalculator.balance(month);
	};

	/* Renting scenario */
	this.rent = function(month) {
		return that.monthlyRent * Math.pow(1 + that.inflationRate, Math.floor(month / 12));
	};

	this.savingsFromRenting = function(month) {
		return that.totalExpenseForHome(month) - that.rent(month);
	};

	this.cashWhenRenting = function(month) {
		if (month == 0) {
			return that.downPayment;
		}
		if (cashWhileRenting[month]) {
			return cashWhileRenting[month];
		}
		cashWhileRenting[month] = that.cashWhenRenting(month - 1) * (1 + that.investmentReturnRate / 12)
			+ that.savingsFromRenting(month);
		return cashWhileRenting[month];
	};

	/* Find month when owning is better than renting */
	this.monthsTillWorthOwning = function() {
		var months = mortgageCalculator.months();
		for (i = 1; i < months; i++) {
			if (that.cashAfterSellingHome(i) > that.cashWhenRenting(i)) {
				return i;
			}
		}
		return -1;
	};

}

