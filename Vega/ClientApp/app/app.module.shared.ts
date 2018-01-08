// Workaround for creating component via ng: ng g c moduleName --module='app.module.shared.ts', remove on the newer version v Angular/cli

import { NgModule } from '@angular/core';
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
import { VehicleService } from './services/vehicle.service';
import { ErrorHandler } from '@angular/core/src/error_handler';
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
        VehicleFormComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(),
        AngularFontAwesomeModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ]
    )
    ]
})
export class AppModuleShared {
}
