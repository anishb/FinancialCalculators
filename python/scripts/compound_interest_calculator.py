import argparse
import sys, os.path
sys.path.append(os.path.abspath('../src/'))
from decimal import *
from interest_calculator import InterestCalculator

def valid_args(args):
    try:
        principal = Decimal(args.principal)
    except InvalidOperation:
        print('Error: {} is not a valid number'.format(args.principal))
        return False

    if principal <= 0:
        print('Error: PRINCIPAL must be greater than 0')
        return False

    try:
        Decimal(args.rate)
    except InvalidOperation:
        print('Error: {} is not a valid number'.format(args.rate))
        return False

    if args.compounds_per_year:
        try:
            Decimal(args.compounds_per_year)
        except InvalidOperation:
            print('Error: {} is not a valid number'.format(args.compounds_per_year))
            return False

    if args.inflation_rate:
        try:
            Decimal(args.inflation_rate)
        except InvalidOperation:
            print('Error: {} is not a valid number'.format(args.inflation_rate))
            return False

    if args.years is not None and args.years < 1:
        print('Error: YEARS must be at least 1.')
        return False

    return True


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compound interest calculator.")
    parser.add_argument('-p', '--principal', required=True, help='The principal amount')
    parser.add_argument('-r', '--rate', required=True, help='The interest rate')
    parser.add_argument('-c', '--compounds_per_year', help='The number of compounds per year')
    parser.add_argument('-i', '--inflation_rate', help='The annual inflation rate')
    parser.add_argument('-y', '--years', help='Number of years. Default=10', type=int, default=10)
    args = parser.parse_args()
    if not valid_args(args):
        parser.print_help()
        sys.exit(1)

    calculator = InterestCalculator(args.principal, args.rate)
    if args.compounds_per_year:
        calculator.compounds_per_year = args.compounds_per_year
    if args.inflation_rate:
        calculator.inflation_rate = args.inflation_rate

    x = iter(calculator)
    print("Year, Balance, Balance adjusted for inflation")
    for i in range(args.years+1):
        amounts = next(x)
        print('{0:d}, {1:.2f}, {2:.2f}'.format(i, amounts[0], amounts[1]))
