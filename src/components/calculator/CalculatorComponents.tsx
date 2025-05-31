import { motion } from "motion/react";
import {ICalculate} from "../../calculate/types.ts";
import {useState} from "react";
import {useCalculatePayment} from "../../calculate/hooks/useCalculatePayment.ts";

export const CalculatorComponents = () => {
    const [inputValues, setInputValues] = useState<ICalculate>({
        mortgageAmount: 0,
        interestRate: 0,
        loanTerm: 0
    })

    const {payment, getAvailableInstances, operationType, changeOperationType, setInterestRate, setMortgageAmount, setLoanTerm} = useCalculatePayment()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value ? parseFloat(value) : 0
        }));
    };

    const handleCalculate = () => {
        setMortgageAmount(inputValues.mortgageAmount);
        setInterestRate(inputValues.interestRate);
        setLoanTerm(inputValues.loanTerm);
    };

    return (
        <motion.div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg">
            <h1>Mortgage Calculator</h1>
            <p>This component will contain the mortgage calculator functionality.</p>
            {/* Additional components and logic will be added here */}
            <input
                type="number"
                name="mortgageAmount"
                value={inputValues?.mortgageAmount}
                onChange={handleInputChange}
                placeholder="Mortgage Amount"
            />
            <input
                type="number"
                name="loanTerm"
                value={inputValues?.loanTerm}
                onChange={handleInputChange}
                placeholder="Loan Term (in years)"
            />
            <input
                type="number"
                name="interestRate"
                value={inputValues?.interestRate}
                onChange={handleInputChange}
                placeholder="Interest Rate (%)"
            />

            <div className="flex items-center">
                {getAvailableInstances().map(({ key, name }) => (
                    <label key={key} className="inline-flex items-center mr-4">
                        <input
                            type="radio"
                            className="form-radio h-5 w-5 text-blue-600"
                            value={key}
                            checked={operationType === key}
                            onChange={() => changeOperationType(key)}
                        />
                        <span className="ml-2 text-gray-700">{name}</span>
                    </label>
                ))}
            </div>

            <button onClick={() => handleCalculate() }>Calcular</button>

            <div>
                <h2>Results</h2>
                {payment?.monthlyPayment && <p>Monthly Payment: {payment.monthlyPayment}</p>}
                {payment?.totalPayment && <p>Total Payment: {payment.totalPayment}</p>}
                {payment?.totalInterest && <p>Total Interest: {payment.totalInterest}</p>}
            </div>
        </motion.div>
    );
}