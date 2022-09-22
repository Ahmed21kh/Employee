import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/Employee';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute , ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  id:any;
  employee:Employee={
    firstName:"",
    lastName:"",
    email:"",
    country:"",
    city:"",
    phone:"",
    salary:"",
  }
  disableSalaryEdit:boolean=true
  disableSalary: any;



  constructor(public employeeService:EmployeeService , public router:Router , public activatedRoute:ActivatedRoute, public flashMessagesService:FlashMessagesService ,public toast:HotToastService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.employeeService.getEmployee(this.id).subscribe((action:any)=>{
      let emp:any=action.payload.toJSON()
      emp['$key']=action.key

      this.employee = emp
      console.log(emp);

    })
  }
  mySubmit(fo:NgForm)
  {

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
         this.router.navigate(['edit-employee/'+ this.id]);
      // this.verifyForm = fo.value;
      // console.log( this.verifyForm);

    }else
    {
      this.employeeService.ubdateEmployee(this.id, fo.value);

      this.toast.success(' Employee updated successfuly !' ,{
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
      this.router.navigate(['employee/'+ this.id])
      console.log("false");
    }




  }
}
