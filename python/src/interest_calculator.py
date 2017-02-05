from decimal import *

class InterestCalculator:
    """Compound interest calculator"""

    def __init__(self, principal, rate):
        self.principal = principal
        self.nominal_rate = rate
        self.compounds_per_year = '1'
        self.inflation_rate = '0.02'

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
        return self.nominal_rate / self.compounds_per_year

    def amount_after_years(self, years):
        rate = Decimal('1') + self.rate_per_compound()
        return self.principal * rate ** (self.compounds_per_year * years)

    def real_amount_after_years(self, years):
        return self.amount_after_years(years) / (Decimal('1') + self.inflation_rate) ** years
