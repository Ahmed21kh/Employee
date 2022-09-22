import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService , public router:Router,public afAuth:AngularFireAuth){}
  canActivate() :boolean {
      console.log('CanActivate called');
      let islogedin = this.authService.isAuthenticated()
      if(islogedin){
        return true
      }else
      return false




  }

}
