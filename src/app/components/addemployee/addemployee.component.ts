import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/Employee';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'rxjs-compat/operator/timeout';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  firstName=""
  lastName=""
  email=""
  country=""
  city=""
  phone=""
  disableSalary=true
  verifyForm=""
  itemarray :any=[];
  employee:Employee={
    firstName:"",
    lastName:"",
    email:"",
    country:"",
    city:"",
    phone:"",
    salary:"",
  }

  constructor(public employeeService :EmployeeService , public flashMessagesService :FlashMessagesService, public router:Router, public toast:HotToastService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employee=>{
      employee.forEach(action=>{
        let emp:any = action.payload.toJSON()
        emp["$key"]=action.key
        this.itemarray.push(emp as Employee )
      });


    });






  }
  mySubmit(fo:NgForm)
  {
    if(this.disableSalary){
      fo.value.salary=2000
    }
    if(!fo.valid){
      this.toast.error('Please write correct info!' ,{
        style: {
          border: '1px solid #ff0000',
          padding: '16px',
          color: '#ff0000',
        },
        iconTheme: {
          primary: '#ff0000',
          secondary: '#FFFAEE',
        },
        // autoClose: true,
        // dismissible: false,
        // theme: 'snackbar',
        // // icon: '❎',
        // duration: 2000,
        // position: 'top-center'
      })

         this.router.navigate(['add-employee']);
      // this.verifyForm = fo.value;
      // console.log( this.verifyForm);

    }else
    {
      this.employeeService.addEmployees(fo.value);
      this.toast.success(' Thanks new employee added successfuly !' ,{

        
        style: {
          border: '1px solid #21b11e',
          padding: '16px',
          color: ' #21b11e',
        },
        iconTheme: {
          primary: ' #21b11e',
          secondary: '#FFFAEE',

        },
        // autoClose: true,
        // dismissible: false,
        // theme: 'snackbar',
        // // icon: '🔥 ',
        // duration: 2000,
        // position: 'top-center'
      })
      this.router.navigate([''])
      console.log("false");
    }




  }

}
