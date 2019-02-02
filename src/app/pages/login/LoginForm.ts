import { AbstractControl, FormGroup } from '@angular/forms';
import { LoginModel } from 'src/app/interfaces/Login';

export interface LoginForm extends FormGroup {
  value: LoginModel;
  controls: {
    email: AbstractControl;
    password: AbstractControl;
  };
}
