import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/Employee';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute , ParamMap } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  editForm:FormGroup
  id:any;
  employee:Employee={
    salary:""
  }
  hasSalary:boolean=false;
  // ubdateSalary:boolean=false;
  itemarray: any;
  ubdateSalaryInput:boolean=false

  constructor( public employeeService:EmployeeService , public router:Router , public activatedRoute:ActivatedRoute, public flashMessagesModule:FlashMessagesService , public toast:HotToastService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(this.id).subscribe(action=>{
      let emp:any=action.payload.toJSON()
      emp['$key']=action.key
       this.employee=emp
       console.log(this.employee);

    if(this.employee.salary > 0){
        this.hasSalary=true
      }

    })
    // this.employeeService.getEmployee(this.id).subscribe((employee:any) => {
    //   if(employee===null){
    //     console.log('this is null value');

    //   }

    //   if(employee.salary > 0){
    //     this.hasSalary=true
    //   }
    //   this.employee = employee
    //   console.log(this.employee);



    // });

  }


  ubdateSalaryEmployee(id:string){
    this.employeeService.ubdateEmployee(this.id , this.employee);
    this.toast.success(' Salary Updated successfully ! :)' ,{
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
    this.router.navigate(['employee/'+ this.id ]);
  }
  myDelete(){
    if(confirm("Are you sure ! :(")){
      this.employeeService.deleteEmployee(this.id);
      this.toast.success(' Employee Deleted successfuly !' ,{
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
    this.router.navigate(['/']);
    }

  }

}


