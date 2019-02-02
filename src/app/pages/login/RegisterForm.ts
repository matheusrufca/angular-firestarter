import { AbstractControl, FormGroup } from '@angular/forms';
import { RegisterModel } from 'src/app/interfaces/Login';

export interface RegisterForm extends FormGroup {
  value: RegisterModel;
  controls: {
    email: AbstractControl;
    password: AbstractControl;
    confirmPassword: AbstractControl;
    name: AbstractControl;
    lastName: AbstractControl;
  };
}


