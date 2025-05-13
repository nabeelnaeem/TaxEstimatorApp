import { Injectable } from '@angular/core';
import { PersonalInfo } from '../models/personal-info.model';
import { FinancialInfo } from '../models/financial-info.model';
import { TaxReturn } from '../models/tax-return.model';

@Injectable({
    providedIn: 'root'
})
export class CalculationService {

    constructor() { }

    calculateTax(personalInfo: PersonalInfo, financialInfo: FinancialInfo): TaxReturn {
        const income =
            Number(financialInfo.annualIncome || 0) +
            Number(financialInfo.otherIncome || 0);
        const deductions =
            Number(financialInfo.mortgageInterest || 0) +
            Number(financialInfo.educationExpenses || 0) +
            Number(financialInfo.charitableDonations || 0);
        const taxableIncome = Math.max(income - deductions, 0);

        const taxRate = this.getTaxRate(personalInfo.age, taxableIncome);
        const taxAmount = taxableIncome * taxRate;

        return {
            totalIncome: income,
            totalDeductions: deductions,
            taxableIncome,
            taxRate,
            taxAmount,
        }

    }

    private getTaxRate(age: number, taxableIncome: number): number {
        if (age < 60) {
            if (taxableIncome <= 50000) return 0.1;
            if (taxableIncome <= 100000) return 0.2;
            return 0.3;
        }
        else {
            //Senion Citizens
            if (taxableIncome <= 50000) return 0.08;
            if (taxableIncome <= 100000) return 0.15;
            return 0.25;
        }
    }
}

