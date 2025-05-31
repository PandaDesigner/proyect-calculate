export interface ICalculate {
    mortgageAmount: number;
    interestRate: number;
    loanTerm: number;
}

export interface ICalculateResult {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
}

export interface CalculateYearPayment {
    name: CalculateType;
    setMortgageAmount: (amount: number) => void;
    setInterestRate: (rate: number) => void;
    setLoanTerm: (term: number) => void;
    getValue: () => ICalculateResult['monthlyPayment'];
    getTotalPayment: () => ICalculateResult['totalPayment'];
    getTotalInterest: () => ICalculateResult['totalInterest'];
}

export interface CalculateMonthlyPayment {
    name: CalculateType;
    setMortgageAmount: (amount: number) => void;
    setInterestRate: (rate: number) => void;
    setLoanTerm: (term: number) => void;
    getValue: () => ICalculateResult['monthlyPayment'];
    getTotalPayment: () => ICalculateResult['totalPayment'];
    getTotalInterest: () => ICalculateResult['totalInterest'];
}

export interface CalculateManagerPayment {
    setMortgageAmount: (amount: number) => void;
    setInterestRate: (rate: number) => void;
    setLoanTerm: (term: number) => void;
    getMonthlyPayment: () => CalculateYearPayment | CalculateMonthlyPayment;
    getTotalPayment: () => ICalculateResult['totalPayment'];
    getTotalInterest: () => ICalculateResult['totalInterest'];

}

export type CalculateType = 'year' | 'month';
export type currentCalculateType = CalculateMonthlyPayment | CalculateYearPayment