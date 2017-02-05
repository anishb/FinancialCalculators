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
