import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from '../body/body.component';
import { HomeComponent } from '../body/home/home.component';

const routes:Routes = [
    {
        path: '',
        component: BodyComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}