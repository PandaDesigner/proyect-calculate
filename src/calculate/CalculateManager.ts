import {CalculateType , currentCalculateType} from "./types.ts";
import {CalculateYearPayments} from "./CalculateYearPayment.ts";
import {CalculateMonthlyPayments} from "./CalculateMonthlyPayments.ts";


export class CalculateManager {

    private caculeInstance: Map<CalculateType, currentCalculateType>;
    private currentInstance: currentCalculateType;

    constructor () {
        this.caculeInstance = new Map<CalculateType, currentCalculateType>();
        this.caculeInstance.set('year', new CalculateYearPayments());
        this.caculeInstance.set('month', new CalculateMonthlyPayments());
        this.currentInstance = this.caculeInstance.get('year')!;
    }

    setInstance(type: CalculateType) {
        const instance = this.caculeInstance.get(type);
        if(instance) {
            this.currentInstance = instance;
        }
    }

    getCurrentInstance(): currentCalculateType {
        return this.currentInstance;
    }

    getAvailableInstances(): Array<{ key : CalculateType, name : string }> {
        return Array.from(this.caculeInstance.entries()).map(([key, value]) => ({
            key,
            name: value.name
        }));
    }

    setMortgageAmount(amount: number): void {
        this.currentInstance.setMortgageAmount(amount);
    }
    setInterestRate(rate: number): void {
        this.currentInstance.setInterestRate(rate);
    }
    setLoanTerm(term: number): void {
        this.currentInstance.setLoanTerm(term);
    }

    getMonthlyPayment(): number {
        return this.currentInstance.getValue()!;
    }
    getTotalPayment(): number {
        return this.currentInstance.getTotalPayment()
    }
    getTotalInterest(): number {
        return this.currentInstance.getTotalInterest();
    }

}