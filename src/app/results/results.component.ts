import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PersonalInfoService } from '../services/personal-info.service';
import { FinancialInfoService } from '../services/financial-info.service';
import { CalculationService } from '../services/calculation.service';
import { TaxReturn } from '../models/tax-return.model';
import { PersonalInfo } from '../models/personal-info.model';
import { FinancialInfo } from '../models/financial-info.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-results',
    imports: [],
    templateUrl: './results.component.html',
    styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
    private personalInfoServ = inject(PersonalInfoService);
    private financialInfoServ = inject(FinancialInfoService);
    private calculationServ = inject(CalculationService);
    private router = inject(Router);

    personalInfo!: PersonalInfo;
    financialInfo!: FinancialInfo;
    taxCalculationResults!: TaxReturn;

    ngOnInit() {
        this.personalInfo = this.personalInfoServ.getPersonalInfo();
        if (this.personalInfo) {
            console.log('Personal Info', true);
        } else {
            this.personalInfo = this.personalInfoServ.getEmpty();
            console.log('Personal Info', false);
        }
        this.financialInfo = this.financialInfoServ.getFinancialInfo();
        if (this.financialInfo) {
            console.log('financialInfo', true);
            console.log('financialInfo', this.financialInfo);

        } else {
            this.financialInfo = this.financialInfoServ.getEmpty();
            console.log('financialInfo', false);
            console.log('financialInfo', this.financialInfo);
        }
        this.taxCalculationResults = this.calculationServ.calculateTax(this.personalInfo, this.financialInfo);
        console.log(this.taxCalculationResults);
    }

    onEditPersonalInfo() {
        this.router.navigate(['/personal']);
    }

    onEditFinancialInfo() {
        this.router.navigate(['/financial']);
    }

}
