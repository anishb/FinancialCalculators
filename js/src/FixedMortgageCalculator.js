function FixedMortgageCalculator(amount, years, rate) {
	var amount = amount;
	var years = years;
	var rate = rate;
	var that = this;

	// Cache
	var monthlyInterest;
	var monthlyPayment;
	var balance = new Array(years * 12);
	var interestPayment = new Array(years * 12);
	var principalPayment = new Array(years * 12);

	this.months = function() {
		return years * 12;
	};

	this.monthlyInterest = function() {
		if (!monthlyInterest) {
			monthlyInterest = rate / 12;
		}
		return monthlyInterest;
	};

	this.monthlyPayment = function() {
		if (!monthlyPayment) {
			var i = that.monthlyInterest()
			var n = that.months();
			monthlyPayment = amount * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
		}
		return monthlyPayment;
	};

	this.balance = function(month) {
		if (month == 0) {
			return amount;
		}
		if (balance[month] !== undefined) {
			return balance[month];
		}
		balance[month] = that.balance(month - 1) - that.principalPayment(month);
		return balance[month];
	};

	this.principalPayment = function(month) {
		if (month == 0) {
			return 0;
		}
		if (principalPayment[month] !== undefined) {
			return principalPayment[month];
		}
		principalPayment[month] = that.monthlyPayment() - that.interestPayment(month);
		return principalPayment[month];
	};

	this.interestPayment = function(month) {
		if (month == 0) {
			return 0;
		}
		if (interestPayment[month] !== undefined) {
			return interestPayment[month];
		}	
		interestPayment[month] = that.balance(month - 1) * that.monthlyInterest();
		return interestPayment[month];
	};

}