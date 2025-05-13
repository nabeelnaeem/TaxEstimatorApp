import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PrivacyParagraphComponent } from "../privacy-paragraph/privacy-paragraph.component";
import { PersonalInfoService } from '../services/personal-info.service';
import { InfomationModels } from '../models/information.model';

@Component({
    selector: 'app-personal-info',
    imports: [ReactiveFormsModule, RouterModule, PrivacyParagraphComponent],
    templateUrl: './personal-info.component.html',
    styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private personalInfoService = inject(PersonalInfoService);

    countries = InfomationModels.countries;
    employmentTypes = InfomationModels.employmentTypes;
    maritalStatus = InfomationModels.maritalStatus;

    personalForm = this.fb.group({
        name: ['Nabeel Naeem Testing', Validators.required],
        email: ['nnabeel03@gmail.com', [Validators.required, Validators.email]],
        age: [60, [Validators.required, Validators.min(18)]],
        maritalStatus: ['Married', Validators.required],
        country: ['Morocco', Validators.required],
        employmentType: ['Contract', Validators.required]
    })

    ngOnInit() {
        if (this.personalInfoService.checkIfPersonalFormSubmitted()) {
            this.personalForm = this.personalInfoService.checkIfPersonalFormSubmitted();
        }
    }

    onSubmit() {

        if (this.personalForm.valid) {
            this.personalInfoService.setPersonalInfo(this.personalForm);  // Pass the form group
            console.log(this.personalInfoService.getPersonalInfo().name);
            this.router.navigate(['/financial']);

        } else {
            console.log('Form is invalid');
        }
    }
}
