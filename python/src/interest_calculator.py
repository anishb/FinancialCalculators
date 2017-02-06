from decimal import *

class InterestCalculator:
    """Compound interest calculator"""

    def __init__(self, principal, rate, compounds_per_year='1', inflation_rate='0.02'):
        """Initializes the compound interest calculator.

        Keyword arguments:
        principal -- The principal amount to begin with
        rate -- The interest rate expressed as a decimal, e.g. '0.04'
        compounds_per_year -- The number of times per year the interest is applied
        inflation_rate -- The current rate of inflation as a decimal, e.g. '0.02'
        """
        self.principal = principal
        self.nominal_rate = rate
        self.compounds_per_year = compounds_per_year
        self.inflation_rate = inflation_rate

    @property
    def principal(self):
        return self._principal

    @principal.setter
    def principal(self, value):
        if not isinstance(value, str):
            raise ValueError('Must set principal with a string')
        self._principal = Decimal(value)

    @property
    def nominal_rate(self):
        return self._nominal_rate

    @nominal_rate.setter
    def nominal_rate(self, value):
        if not isinstance(value, str):
            raise ValueError('Must set nominal_rate with a string')
        self._nominal_rate = Decimal(value)

    @property
    def compounds_per_year(self):
        return self._compounds_per_year

    @compounds_per_year.setter
    def compounds_per_year(self, value):
        if not isinstance(value, str):
            raise ValueError('Must set compounds_per_year with a string')
        self._compounds_per_year = Decimal(value)

    @property
    def inflation_rate(self):
        return self._inflation_rate

    @inflation_rate.setter
    def inflation_rate(self, value):
        if not isinstance(value, str):
            raise ValueError('Must set inflation rate with a string')
        self._inflation_rate = Decimal(value)

    def rate_per_compound(self):
        """Calculates the interest rate per compound period."""
        return self.nominal_rate / self.compounds_per_year

    def amount_after_years(self, years):
        """Calculates the balance after n number of years."""
        rate = Decimal('1') + self.rate_per_compound()
        return self.principal * rate ** (self.compounds_per_year * years)

    def real_amount_after_years(self, years):
        """Calculates the balance after n number of years, adjusting for inflation."""
        return self.amount_after_years(years) / (Decimal('1') + self.inflation_rate) ** years

    def __iter__(self):
        self._years = 0
        return self

    def __next__(self):
        nominal_amount = self.amount_after_years(self._years)
        real_amount = self.real_amount_after_years(self._years)
        self._years += 1
        return (nominal_amount, real_amount)
