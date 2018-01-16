// Workaround for creating component via ng: ng g c moduleName --module='app.module.shared.ts', remove on the newer version v Angular/cli

import { NgModule, ErrorHandler} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleService } from './services/vehicle.service';
import { AppErrorHandler } from './app.error-handler';

@NgModule({
    providers: [
        VehicleService,
        { provide: ErrorHandler, useClass: AppErrorHandler}
    ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(),
        AngularFontAwesomeModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: VehicleFormComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ]
    )
    ]
})
export class AppModuleShared {
}
