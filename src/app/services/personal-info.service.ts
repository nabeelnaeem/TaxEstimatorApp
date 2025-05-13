import { Injectable } from '@angular/core';
import { PersonalInfo } from '../models/personal-info.model';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class PersonalInfoService {
    private personalFormUserSubmitted!: FormGroup;
    private personalInfo!: PersonalInfo;


    getEmpty(): PersonalInfo {
        const emptyPersonalInfo: PersonalInfo = {
            name: 'User',
            age: 18,
            email: 'N/A',
            maritalStatus: 'N/A',
            country: 'N/A',
            employmentType: 'N/A'
        }
        return emptyPersonalInfo;
    }

    checkIfPersonalFormSubmitted() {
        return this.personalFormUserSubmitted;
    }

    setPersonalInfo(personalForm: FormGroup) {
        this.personalFormUserSubmitted = personalForm;
        this.mapFormValuesToModel(personalForm);
    }
    getPersonalInfo() {
        if (this.personalInfo) {
            console.log('getPersonalInfo() - true', this.personalInfo);
            return this.personalInfo;
        }
        else {
            console.log('getPersonalInfo() - false', this.personalInfo);
            return this.getEmpty();
        }
    }
    private mapFormValuesToModel(personalForm: FormGroup) {
        if (personalForm.valid) {
            const formValues = personalForm.value;
            this.personalInfo = {
                name: formValues.name ?? '',  // Handle null/undefined
                email: formValues.email ?? '',
                age: typeof formValues.age === 'number' ? formValues.age : 0,
                maritalStatus: formValues.maritalStatus ?? '',
                country: formValues.country ?? '',
                employmentType: formValues.employmentType ?? ''
            };
        } else {
            console.log('Form is invalid, cannot map values');
        }
    }
}
