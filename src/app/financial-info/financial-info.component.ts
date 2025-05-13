import { Component, inject, OnInit } from '@angular/core';
import { PrivacyParagraphComponent } from '../privacy-paragraph/privacy-paragraph.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalInfoService } from '../services/personal-info.service';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { FinancialInfoService } from '../services/financial-info.service';
import { PersonalInfo } from '../models/personal-info.model';
import { FinancialInfo } from '../models/financial-info.model';
@Component({
    selector: 'app-financial-info',
    imports: [PrivacyParagraphComponent, ReactiveFormsModule],
    templateUrl: './financial-info.component.html',
    styleUrl: './financial-info.component.css'
})
export class FinancialInfoComponent implements OnInit {
    //Injecting Services
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private personalInfoService = inject(PersonalInfoService);
    private financialInfoService = inject(FinancialInfoService);

    personalServForm = this.personalInfoService.getPersonalInfo();
    financialServForm = this.financialInfoService.getFinancialInfo();


    personalInfo!: PersonalInfo;
    financialInfo!: FinancialInfo;
    name: string = 'User';
    financialForm: FormGroup = this.fb.group({
        annualIncome: [0, [Validators.required, Validators.min(0)]],
        otherIncome: [0, [Validators.min(0)]],
        mortgageInterest: [0, [Validators.min(0)]],
        educationExpenses: [0, [Validators.min(0)]],
        charitableDonations: [0, [Validators.min(0)]],
    });

    setName() {
        const fullname = this.personalInfo.name;
        const spaceIndex = fullname.indexOf(' ');
        this.name = spaceIndex == -1 ? fullname : fullname.slice(0, spaceIndex);
    }

    ngOnInit(): void {
        this.personalInfo = this.personalInfoService.getPersonalInfo();
        this.financialInfo = this.financialInfoService.getFinancialInfo();
        this.setName();
        //const savedFinancialInfo = this.financialInfoService.getFinancialInfo();
        console.log('Financial-Info Component Initialized');
        if (this.financialInfo) {
            this.financialForm.patchValue(this.financialInfo);
        }
    }

    onEditPersonalInfo() {
        this.router.navigate(['/personal']);
    }

    onSubmit() {
        if (this.financialForm.valid) {
            this.financialInfoService.setFinancialInfo(this.financialForm);
            console.log(this.financialInfoService.getFinancialInfo());
            this.router.navigate(['/results']);
        } else {
            console.log('Form is invalid');
        }
    }
}
