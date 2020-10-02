import { Component, OnInit } from '@angular/core';

import { Employee } from '../model/employee.model';
import { CommonService } from '../common.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {



  employees: Employee[];
 // employees1: Employee[];
  i:any;

  constructor(private cs: CommonService) { }

  ngOnInit(): void {

    this.getAll();
  
  }

  getAll() {

    this.cs.getEmployee().subscribe((response) => {
      this.employees = response;
    });
  }



 //image base 64
 onChange($event: Event) {

  const file = ($event.target as HTMLInputElement).files[0];
  console.log(file);
  this.convertToBase64(file);
}
convertToBase64(file: File) {

  const observable = new Observable((subscriber: Subscriber<any>) => {
    this.readFile(file, subscriber);
  });

  observable.subscribe((d) => {
    //  console.log(d);
    this.myimage = d;


    console.log("hopppppppppppp", this.myimage)
  });
}
myimage(arg0: string, myimage: any) {
  throw new Error('Method not implemented.');
}


readFile(file: File, subscriber: Subscriber<any>) {
  const filereader = new FileReader();
  filereader.readAsDataURL(file);

  filereader.onload = () => {
    subscriber.next(filereader.result);

    subscriber.complete();
  }
  filereader.onerror = (error) => {
    subscriber.error(error);
    subscriber.complete();
  };
}







// Delete method
  clickMethod(emp: any) {
    if (confirm("Are you sure to delete ")) {
      console.log("Employee Deleted");
      this.cs.deleteEmployee(emp.id).subscribe(() => {
        this.getAll();
      })
    }
  }

edit(emp){

   this.cs.curruntData=Object.assign({},emp);
  
}
// update(curruntData){

//       console.log(curruntData);
//     this.cs.update(curruntData).subscribe((res)=>{
     
//        this.i=res;

//          console.log(this.i);
//     });
 
// }
update(curruntData){

  console.log(curruntData);
this.cs.update(curruntData,this.myimage).subscribe((res)=>{
 
   this.i=res;

     console.log(this.i);
});

}




     
  
  }




