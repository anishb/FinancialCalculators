import unittest
from src import interest_calculator
from decimal import *

class InterestCalculatorTestCases(unittest.TestCase):
    """Test cases for InterestCalculator"""

    FIVE_PLACES = Decimal('1.00000')

    def setUp(self):
        self.calculator = interest_calculator.InterestCalculator('50000', '0.02')

    def test_rate_per_compound(self):
        self.assertEqual(self.calculator.rate_per_compound(), Decimal('0.02'))
        self.calculator.compounds_per_year = '12'
        self.assertEqual(self.calculator.rate_per_compound().quantize(self.FIVE_PLACES), Decimal('0.00167'))

    def test_amount_after_years(self):
        self.assertEqual(self.calculator.amount_after_years(10).quantize(self.FIVE_PLACES), Decimal('60949.72100'))
        self.calculator.compounds_per_year = '12'
        self.assertEqual(self.calculator.amount_after_years(10).quantize(self.FIVE_PLACES), Decimal('61059.97169'))

    def test_real_amount_after_years(self):
        self.assertEqual(self.calculator.real_amount_after_years(10).quantize(self.FIVE_PLACES), Decimal('50000'))
        self.calculator.inflation_rate = '0.01'
        self.assertEqual(self.calculator.real_amount_after_years(10).quantize(self.FIVE_PLACES), Decimal('55176.98731'))

    def test_iterator(self):
        self.calculator.nominal_rate = '0.03'
        a = iter(self.calculator)
        expected = (('50000', '50000'), ('51500', '50490.19608'), ('53045', '50985.19800'), ('54636.35', '51485.05288'))
        for x in range(4):
            amounts = next(a)
            self.assertEqual(amounts[0].quantize(self.FIVE_PLACES), Decimal(expected[x][0]),
                    'nominal amount after {} years is incorrect'.format(x))
            self.assertEqual(amounts[1].quantize(self.FIVE_PLACES), Decimal(expected[x][1]),
                    'real amount after {} years is incorrect'.format(x))
