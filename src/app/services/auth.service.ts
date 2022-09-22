import { Injectable } from '@angular/core';
import {  signInWithEmailAndPassword ,Auth, authState ,createUserWithEmailAndPassword, updateProfile  } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'rxjs/Rx'
import { from } from 'rxjs';
import { switchMap } from 'rxjs-compat/operators/switchMap';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean = false
  currentUser$ = authState(this.afAuth);

  constructor(public afAuth:Auth , public ath:AngularFireAuth) { }
  login(email:any, password:any){
    return from(signInWithEmailAndPassword(this.afAuth , email, password))
    }
    logout(){
      return from(this.afAuth.signOut())
    }
    signup(name:any , email:any , password:any){
      return from(createUserWithEmailAndPassword(this.afAuth,email,password)).pipe(
        switchMap(({user})=> updateProfile(user, { displayName: name }))
      )
    };
    isAuthenticated(){
      return this.isLoggedIn;
    }
    getauth(){
      return this.ath.authState.map(auth => auth);
    }
  }

