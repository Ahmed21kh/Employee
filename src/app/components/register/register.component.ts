import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , FormBuilder ,Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Employee } from 'src/app/Employee';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide:boolean=true 

 signUpForm = new FormGroup({
    name: new FormControl ('',[Validators.required , Validators.minLength(4)] ),
    email: new FormControl('', [Validators.required ,Validators.email]),
    password:new FormControl('',[Validators.required]),
    confirmpassword:new FormControl('',[Validators.required ]),
  },{
       validators:this.passwordMatch('password','confirmpassword')
    }
  )
  constructor(private fb:FormBuilder ,public router:Router, public authService:AuthService , private toast:HotToastService) { }

  ngOnInit(): void {

  }
  get f(){
    return this.signUpForm.controls;
  }
  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmpassword(){
    return this.signUpForm.get('confirmpassword');
  }
  mySubmit(){
    if (!this.signUpForm.valid){
      return;
    }
    const {name, email , password} = this.signUpForm.value;
    this.authService.signup( name , email , password).pipe(
      this.toast.observe({
        success:'You are sign Up successfully :)',
        loading:'Signing up...',
        error:({message})=>`${message}`
      })
    ).subscribe(()=>{
        this.router.navigate([''])
    })



  }
  passwordMatch(password: string, confirmPassword: string):ValidatorFn {
    return (formGroup: AbstractControl):ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true }
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
