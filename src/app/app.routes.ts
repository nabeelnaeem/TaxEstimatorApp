import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { FinancialInfoComponent } from './financial-info/financial-info.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'personal', component: PersonalInfoComponent },
    { path: 'financial', component: FinancialInfoComponent },
    { path: 'results', component: ResultsComponent }
];
