import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-reactive-form',
  templateUrl: './basic-reactive-form.component.html',
  styleUrls: ['./basic-reactive-form.component.css']
})
export class BasicReactiveFormComponent {

  formdata: any = [];

  private jsonfile = '/assets/formdata.json';

  // A form field with form Group class. It takes an arguements of Form Control and Form Array.
  // It can also take an arg of nested Form Group.
  form = new FormGroup({
    username: new FormControl('', Validators.required), //Validator is the second arg of Form Control for showing errors
    password: new FormControl('', Validators.required),
    allUsernames: new FormArray([])
  });


// Getting Data Form Json Server
  constructor(private http: HttpClient){

    http.get(this.jsonfile).subscribe(response => {
      this.formdata = response;
    });
  }

  // This method will add anything typed in the field to form Array
  addUsernames(usernameInput: HTMLInputElement){
    this.Usernames.push(new FormControl(usernameInput.value));
    usernameInput.value = '';
  }

  // this method will delete the element of the array
  removeEntry(username: FormControl){
    let index = this.Usernames.controls.indexOf(username);
    this.Usernames.removeAt(index);
  }

  deleteAll(){

    this.Usernames.clear();
  }

  // a Property for array of all useernames
  get Usernames(){
    return (this.form.get('allUsernames') as FormArray);
  }

  // a property for getting a username field of the form
  get username(){
      return this.form.get('username');
    }


// --> for httpClient Module methods --> get(), post(), put(), delete().  Below Methods required.
// need to use json server for them. cannot add in local file


  // addUsernames(usernameInput: HTMLInputElement){

  //   let usernameObject: any = { title: usernameInput.value };
  //   usernameInput.value = '';

  //   this.http.post(this.jsonfile, JSON.stringify(usernameObject)).subscribe((response: any) => {
  //     usernameObject.id = response.id;
  //     this.formdata.splice(0, 0, usernameObject);
  //     console.log(response);
  //   });
  //}


  // updateUsername(usernameInput: any){
  //   this.http.put(this.jsonfile + '/' + usernameInput.id, JSON.stringify(usernameInput)).subscribe(response => {
  //     console.log("update");
  //   });

  // }


  // deleteUsername(){

  // }


    //for showing advanced errors
  // login(){
  //   this.form.setErrors({
  //     invalidLogin: true
  //   });
    // let isValid = authService.login(this.form.value);
    // if(!isValid){
  //}
}
