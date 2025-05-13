import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FinancialInfo } from '../models/financial-info.model';

@Injectable({
    providedIn: 'root'
})
export class FinancialInfoService {
    private financialFormUserSubmitted!: FormGroup;
    private financialInfo!: FinancialInfo;

    checkIfFinancialFormSubmitted() {
        return this.financialFormUserSubmitted;
    }

    setFinancialInfo(financialForm: FormGroup) {
        this.financialFormUserSubmitted = financialForm;
        this.mapFormValuesToModel(financialForm);
    }
    getEmpty(): FinancialInfo {
        const emptyFinancialInfo: FinancialInfo = {
            annualIncome: 0,
            otherIncome: 0,
            mortgageInterest: 0,
            educationExpenses: 0,
            charitableDonations: 0
        }
        return emptyFinancialInfo;
    }

    getFinancialInfo() {
        return this.financialInfo;
    }

    private mapFormValuesToModel(financialForm: FormGroup) {
        if (financialForm.valid) {
            const formValues = financialForm.value;
            this.financialInfo = {
                annualIncome: formValues.annualIncome ?? 0,
                otherIncome: formValues.otherIncome ?? 0,
                mortgageInterest: formValues.mortgageInterest ?? 0,
                educationExpenses: formValues.educationExpenses ?? 0,
                charitableDonations: formValues.charitableDonations ?? 0
            };
        }
        else {
            console.log('Form is Invalid, cannot map values');
        }
    }

    constructor() { }
}
