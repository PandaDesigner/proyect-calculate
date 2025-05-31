import {useCallback , useEffect , useRef , useState} from "react";
import {CalculateManager} from "../CalculateManager.ts";
import {CalculateType , ICalculate , ICalculateResult} from "../types.ts";


export const useCalculatePayment = () => {
    const calculateRef = useRef(new CalculateManager());
    const [operationType, setOperationType] = useState<CalculateType>('year');
    const [ payment, setPayment ] = useState<ICalculateResult>();
    const [ amountCalculate, setAmountCalculate ] = useState<ICalculate>({
        mortgageAmount: 0,
        interestRate: 0,
        loanTerm: 0
    });
    const [error, setError] = useState<string | null>(null);


    const changeOperationType = useCallback((type: CalculateType) => {
        calculateRef.current.setInstance(type);
        setOperationType(type);
    },[])

    const setMortgageAmount = useCallback((amount: ICalculate['mortgageAmount'] = 0) => {
        calculateRef.current.setMortgageAmount(amount);
        setAmountCalculate({
            ...amountCalculate,
            mortgageAmount: amount
        });
    },[amountCalculate])

    const setInterestRate = useCallback((rate: ICalculate['interestRate'] = 0) => {
        calculateRef.current.setInterestRate(rate);
        setAmountCalculate({
            ...amountCalculate,
            interestRate: rate
        });
    },[amountCalculate])

    const setLoanTerm = useCallback((term:ICalculate['loanTerm']= 0) => {
        calculateRef.current.setLoanTerm(term);
        setAmountCalculate({
            ...amountCalculate,
            loanTerm: term
        });
    },[amountCalculate])

    const updateCalculate = useCallback(() => {
        try {
            const currentInstance = calculateRef.current.getCurrentInstance();
            setPayment({
                monthlyPayment: currentInstance.getValue(),
                totalPayment: currentInstance.getTotalPayment(),
                totalInterest: currentInstance.getTotalInterest()
            });
        } catch (e) {
            setError('An error occurred while calculating the payment.');
            console.error(e);
            setPayment({
                monthlyPayment: 0,
                totalPayment: 0,
                totalInterest: 0
            });
        }
    },[])

    const getAvailableInstances = useCallback(() => {
        return calculateRef.current.getAvailableInstances();
    },[])

    useEffect ( () => {
        setPayment({
            monthlyPayment: calculateRef.current.getCurrentInstance().getValue(),
            totalPayment: calculateRef.current.getCurrentInstance().getTotalPayment(),
            totalInterest: calculateRef.current.getCurrentInstance().getTotalInterest()
        })

        updateCalculate()
    } , [operationType, amountCalculate, updateCalculate] );



    return {
        changeOperationType,
        setMortgageAmount,
        setInterestRate,
        setLoanTerm,
        amountCalculate,
        getAvailableInstances,
        payment,
        operationType,
        error
    }

}