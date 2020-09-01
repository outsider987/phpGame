import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { UsernameValidator,ConfirmedValidator } from 'src/app/core/models/validatorFile';
import { LanguageService } from 'src/app/shared/language.service';


enum User_failed_Enum {
  UserName = 0,
  UserEmail = 1,
  Userpas = 2,
  Sucess = 3
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  user_failed_Enum: User_failed_Enum;
  countries: Array<any> = [];
  constructor(private fb: FormBuilder,
    private dataService: UserService,
    private router: Router,
    public translate: TranslateService,
    private language: LanguageService,
    )
    {
    this.angForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      name: new FormControl('', [Validators.required, Validators.minLength(3), UsernameValidator.cannotContainSpace]),
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],

     confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
    this.language.setInitState();
  }


  ngOnInit() {
    this.countries = [{
      "name": "India",
      "code": "IN"
    },
    {
      "name": "United Kingdom",
      "code": "UK"
    },
    {
      "name": "United State",
      "code": "EN"
    },
    {
      "name": "Taiwan",
      "code": "TW"
    },
    ];
  }


  postdata(angForm1: FormGroup) {
    if (angForm1.valid) {
      this.dataService.userregistration(angForm1.value.name, angForm1.value.email, angForm1.value.password)
        .subscribe(
          data => {
            var user = data['data'];
            if (!user['validate']) {
              this.user_failed_Enum = user['user_failed_Enum'];
              console.log('duplicate');
            }
            else {
              this.router.navigate(['game1']);
            }
          },

          error => {

          });

    }

  }

  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get name() { return this.angForm.get('name'); }
  get confirm_password() { return this.angForm.get('confirm_password'); }
}
