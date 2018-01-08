import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone } from "@angular/core";
import { constructDependencies } from "@angular/core/src/di/reflective_provider";


export class AppErrorHandler implements ErrorHandler {
    
    constructor(
    private ngZone: NgZone,
    @Inject(ToastyService) 
    private toastyService: ToastyService) { }
    
    handleError(error: any): void {

        this.ngZone.run(() => {

            this.toastyService.error({
                title: 'Error',
                msg: 'Something unexpected happened.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });

        });
}
}