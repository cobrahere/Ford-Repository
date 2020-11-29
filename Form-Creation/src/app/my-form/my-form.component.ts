import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  
  formArray: any;
  registrationForm: FormGroup
  
  constructor(private HttpClient: HttpClient, private fb: FormBuilder) { 

  }

  ngOnInit(): void {

    this.registrationForm = this.fb.group({});

    this.HttpClient.get('/assets/formdata.json').subscribe(data => {
      this.formArray = data;

    });
  }
  createFormControl(){
    this.formArray.array.forEach((element: FormArray) => {
      this.registrationForm.addControl(element.ID, new FormControl(''));
    });
      
      
    
  }


}
