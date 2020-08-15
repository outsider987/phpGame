import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { UsernameValidator } from 'src/app/core/models/validatorFile';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
    this.angForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],

      name: new FormControl('', [Validators.required, Validators.minLength(3),UsernameValidator.cannotContainSpace]),
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
    });
    // debugger
    // this.angForm.setValidators(UsernameValidator.cannotContainSpace)
  }


  ngOnInit() {
  }


  postdata(angForm1: FormGroup) {
    if (angForm1.valid) {
      this.dataService.userregistration(angForm1.value.name, angForm1.value.email, angForm1.value.password)
        .subscribe(
          data => {
              var user = data['data'];
              if ( user['validate']) {
              console.log('here is duplicated');
            }
          },

          error => {
          });

    }

  }

  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get name() { return this.angForm.get('name'); }
}
