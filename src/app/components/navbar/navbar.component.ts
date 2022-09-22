import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Auth ,signInWithEmailAndPassword } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean
  isUserlogin:any
  enableRegister:boolean

  constructor(public authService:AuthService , public router:Router , private ath:Auth ,public toast:HotToastService) { }

  ngOnInit(): void {
    this.authService.getauth().subscribe(auth =>{
      if(auth){
        this.isLogin=true
        this.isUserlogin = auth.email
      }else
      {
        this.isLogin=false
      }
    })
  }

 logout(){
  this.authService.logout().subscribe(()=>{
    this.toast.success('You are logout successfuly',{
      style: {
        border: '1px solid #21b11e',
        padding: '16px',
        color: ' #21b11e',
      },
      iconTheme: {
        primary: ' #21b11e',
        secondary: '#FFFAEE',

      },
    })
    this.router.navigate(['login'])

  })

 }
}
