import {CalculateMonthlyPayment, CalculateType, ICalculate, ICalculateResult} from "./types.ts";

export class CalculateMonthlyPayments implements CalculateMonthlyPayment {
    name: CalculateType = 'month';
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
        this.loanTerm = term;
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

    // Método para calcular el desglose de pagos por mes
    getMonthlyPayments(): { month: number; payment: number; interest: number; principal: number }[] {
        const monthlyPayments: { month: number; payment: number; interest: number; principal: number }[] = [];
        let remainingBalance = this.mortgageAmount;

        for (let month = 1; month <= this.loanTerm; month++) {
            const interestPayment = remainingBalance * this.interestRate;
            const principalPayment = this.getValue() - interestPayment;

            remainingBalance -= principalPayment;

            monthlyPayments.push({
                month,
                payment: Number(this.getValue().toFixed(2)),
                interest: Number(interestPayment.toFixed(2)),
                principal: Number(principalPayment.toFixed(2)),
            });
        }

        return monthlyPayments;
    }
}