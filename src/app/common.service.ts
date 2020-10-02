import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Employee } from './model/employee.model';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  
  url='http://localhost:8009/employees';


  private listEmployees:Employee[]=[
    {
      id:1,
      firstName: 'Asmita',
      lastName: 'Patil',
      email:'asmita@1234',
      DOB:new Date('10/3/2019'),
      phoneNumber:12345667,
      Address:'pune',
      position:'HR',
      photopath:'/assets/images/pic2.jpg'
     },
     
     {
      id:1,
      firstName: 'Rahul',
      lastName: 'Patil',
      email:'asmita@1234',
      DOB:new Date('10/3/2019'),
      phoneNumber:12345667,
      Address:'pune',
      position:'HR',
      photopath:'/assets/images/pic1.jpg'
     }
  ];

    curruntData:Employee={

      id:null,
      firstName: '',
      lastName: '',
      email:'',
      DOB:null,
      phoneNumber:null,
      Address:'',
      position:'',
      photopath:''
    }

  constructor(private httpClient:HttpClient) { }

 
//GET DATA
  getEmployee(): Observable<Employee[]>{
    
    return this.httpClient.get<Employee[]>("http://localhost:8009/employees");
  }


//GET DATA BY ID
getEmployee1(id:number): Observable<Employee[]>{
    
  return this.httpClient.get<Employee[]>(`${this.url}/${id}`);
 }


//SAVE DATA
  save(employee:Employee,img): Observable<Employee>{

    // return this.httpClient.post<Employee>("http://localhost:8009/employees", employee);
   //  return this.httpClient.post<Employee>("http://localhost:8009/employees", employee,{"photopath":img});
     return this.httpClient.post<Employee>("http://localhost:8009/employees",{"firstName":employee.firstName, "lastName":employee.lastName,"email":employee.email,"DOB":employee.DOB,"phoneNumber":employee.phoneNumber,"Address":employee.Address,"position":employee.position ,"photopath":img});
  }



  //DELETE DATA

  deleteEmployee(id:number):Observable<void>{
    return this.httpClient.delete<void>("http://localhost:8009/employees/"+id); 
 }


//UPDATE


// update(employee:Employee): Observable<Employee>{

//   return this.httpClient.put<Employee>(this.url + '/' + employee.id, employee);
// }

update(employee:Employee,img): Observable<Employee>{

 // return this.httpClient.put<Employee>(this.url + '/' + employee.id, employee,);
 return this.httpClient.put<Employee>(this.url + '/' + employee.id,{"firstName":employee.firstName, "lastName":employee.lastName,"email":employee.email,"DOB":employee.DOB,"phoneNumber":employee.phoneNumber,"Address":employee.Address,"position":employee.position ,"photopath":img});
}


}
