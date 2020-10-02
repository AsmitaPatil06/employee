import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Employee } from '../model/employee.model';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  preview: false;

  employee: Employee =
    {

      id: null,
      firstName: null,
      lastName: null,
      email: null,
      DOB: null,
      phoneNumber: null,
      Address: null,
      position: null,
      photopath: null
    };



  constructor(private cs: CommonService, private _router: Router) {

    this.datePickerConfig=Object.assign({},{
      
      containerClass:'theme-dark-blue',
      showWeekNumbers:false,
      dateInputFormat:'DD/MM/YYYY'
      
    });
   }

  ngOnInit(): void {

    
  }

  datePickerConfig: Partial<BsDatepickerConfig>;



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




  Save() {


    if (this.employee.id === null) {
        
      this.cs.save(this.employee,this.myimage).subscribe(
        (data: Employee) => {
          console.log(data);
        })
    }

  }
  
}
