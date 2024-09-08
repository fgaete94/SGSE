import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree, CanActivateFn, CanActivate, GuardResult, MaybeAsync  }  from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable ({
providedIn: 'root'
})

export class AuthGuard implements CanActivate {


    firebaseSvc = inject(FirebaseService);
    utilsSVC = inject(UtilsService);

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

            let user = localStorage.getItem('user')
            return new Promise((resolve) => {

                this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {

                    if(auth){
                        if (user) resolve(true)
                    }
                    else{
                        this.utilsSVC.routerLink('/auth');
                        resolve(false);
                    }
                })
            })    
    }
}













