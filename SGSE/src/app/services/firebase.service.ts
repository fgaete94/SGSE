import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //auth = inject(AngularFireAuth)
  //firestore = inject(AngularFirestore)
  //utilsSvc = inject(UtilsService)

  constructor(private auth : AngularFireAuth, private firestore : AngularFirestore, private utilsSvc : UtilsService){}

  //=======Autenticación=======

  getAuth(){
    return getAuth();
  }

  // acceder
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)

  }

  // registrar
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)

  }

    // Actualizar
    updateUser(displayName: string) {
      return updateProfile(getAuth().currentUser, {displayName})
  
    }


    // recuperar contraseña
    sendRecoveryEmail(email: string){
      return sendPasswordResetEmail(getAuth(), email)
    }

  // Cerrar Sesión
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
    }


  //=======BBDD=======

  // enviar un documento a la BBDD
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(),path),data);

  }

 // recuperar un documento de la base de datos
  async  getDocument(path:string){
    return(await getDoc(doc(getFirestore(),path))).data() ;

  }


}
