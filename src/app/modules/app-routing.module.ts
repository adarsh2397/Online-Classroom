import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from '../body/body.component';
import { HomeComponent } from '../body/home/home.component';

const routes:Routes = [ ]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    routes = [
        {
            path: '',
            component: BodyComponent,
            children: [
                {
                    path: 'home',
                    component: HomeComponent
                }
            ]
        },
    ]
}