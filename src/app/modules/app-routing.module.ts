import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from '../body/body.component';
import { HomeComponent } from '../body/home/home.component';
import { DashboardComponent } from '../body/dashboard/dashboard.component'
import { WorkspaceComponent } from '../body/workspace/workspace.component';
import { CreateClassroomComponent } from '../body/create-classroom/create-classroom.component';
import { JoinClassroomComponent } from '../body/join-classroom/join-classroom.component';

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
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'workspace',
                component: WorkspaceComponent
            },
            {
                path: 'create-classroom',
                component: CreateClassroomComponent
            },
            {
                path: 'join-classroom',
                component: JoinClassroomComponent
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