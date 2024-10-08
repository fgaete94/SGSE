import { Injectable,inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  //loadingCtrl = inject(LoadingController);
  //toastCtrl = inject(ToastController);
  //router = inject(Router)

  constructor( private loadingCtrl :  LoadingController, private toastCtrl : ToastController, private router :  Router ){}


  //=== loading ===

  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent'})
  }

  /// === Toast =====

  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  /// === enviar a cualqueior pagina=====
  routerLink(url:string){
    return this.router.navigateByUrl(url);
  }


  // === guardar un elemento local ==

  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value))
  }

  // == obtener elemento del local

  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key))
  }
}
