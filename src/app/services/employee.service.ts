import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList , AngularFireObject  } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Employee } from '../Employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees : AngularFireList<any>;
  employee : AngularFireObject<any>;
  emp: Observable<any[]>
  constructor(public af:AngularFireDatabase) {
    this.employees= this.af.list('/employees');
  }
  getEmployees(){

    this.employees = this.af.list('/employees') as AngularFireList<Employee[]>
    this.emp = this.employees.snapshotChanges();
    return this.employees.snapshotChanges()
  }

  addEmployees(emploee:Employee){

    return this.employees.push(emploee)

  }
  getEmployee(id:string){
    this.employee = this.af.object('employees/' + id ) as AngularFireObject<Employee>

this.employee.snapshotChanges().subscribe(action => {
  console.log(action.type);
  console.log(action.key)
  console.log(action.payload.val())

});

//    this.employee.snapshotChanges().subscribe(action => {

//     console.log(action.payload.val())
// });
     return this.employee.snapshotChanges()
  }
  ubdateEmployee(id:any , employee:Employee){
    const $key = employee.$key
    delete employee.$key

  return this.employees.update(id , employee)
  }
  deleteEmployee(id:string){
   return this.employees.remove(id)

  }
}
