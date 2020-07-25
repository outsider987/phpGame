import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
angForm: FormGroup;
constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
this.angForm = this.fb.group({
email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],

name: ['',  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
password: ['',  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
});
}

ngOnInit() {
}

postdata(angForm1)
{
  this.dataService.userregistration(angForm1.value.name,angForm1.value.email,angForm1.value.password)
  .subscribe(
  data => {
  //this.router.navigate(['login']);
  },

  error => {
  });
}

get email() { return this.angForm.get('email'); }
get password() { return this.angForm.get('password'); }
get name() { return this.angForm.get('name'); }
}
