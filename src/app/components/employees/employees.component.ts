import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/Employee';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
employees : Employee[];
itemarray :any=[];
totalEmployees:any
totalSalarySum:any
  constructor(public employeeService :EmployeeService ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employee=>{
      employee.forEach(action=>{
        let emp:any = action.payload.toJSON()
        emp["$key"]=action.key
        this.itemarray.push(emp as Employee )
      });
      

      this.getTotalEmployee()
    });

  }

  getTotalEmployee(){
    let total=0;
    let totalsalary=0
    for (let index = 0; index < this.itemarray.length; index++) {
      total += 1;
      totalsalary += parseFloat(this.itemarray[index].salary.toString());

    }
    this.totalEmployees=total;
    this.totalSalarySum=totalsalary
    console.log(this.totalEmployees);
    console.log(this.totalSalarySum);

  }

}
