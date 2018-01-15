import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone } from "@angular/core";
import { constructDependencies } from "@angular/core/src/di/reflective_provider";


export class AppErrorHandler implements ErrorHandler {
    
    constructor(
    @Inject(NgZone)
    private ngZone: NgZone,
    @Inject(ToastyService) 
    private toastyService: ToastyService) { }
    
    handleError(error: any): void {

        this.ngZone.run(() => {

           /*  this.toastyService.error({
                title: 'Error',
                msg: 'Something unexpected happened.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            }); */
            // Comment workaround. Because of Ng2Toasty there were errors with loading pages with URL param routes, gotta fix this later.

        });
}
}