import {CalculateType , CalculateYearPayment , ICalculate , ICalculateResult} from "./types.ts";

export class CalculateYearPayments implements CalculateYearPayment {
    name: CalculateType = 'year';
    private totalPayment!: ICalculateResult['monthlyPayment'];
    private mortgageAmount: number = 0;
    private interestRate: number = 0;
    private loanTerm: number = 0;

    private value(amount: ICalculate = {
        mortgageAmount: this.mortgageAmount,
        interestRate: this.interestRate,
        loanTerm: this.loanTerm
    }): void {
        const { mortgageAmount, interestRate, loanTerm } = amount;

        this.totalPayment = mortgageAmount *
            (interestRate * Math.pow(1 + interestRate, loanTerm)) /
            (Math.pow(1 + interestRate, loanTerm) - 1);
    }

    setMortgageAmount(amount: number): void {
        this.mortgageAmount = amount;
    }

    setInterestRate(rate: number): void {
        this.interestRate = rate / 100 / 12;
    }

    setLoanTerm(term: number): void {
        this.loanTerm = term * 12;
    }

    getValue(): number {
        this.value();
        return Number(this.totalPayment.toFixed(2));
    }

    getTotalPayment(): number {
        return Number((this.getValue() * this.loanTerm).toFixed(2));
    }

    getTotalInterest(): number {
        return Number((this.getTotalPayment() - this.mortgageAmount).toFixed(2));
    }
}