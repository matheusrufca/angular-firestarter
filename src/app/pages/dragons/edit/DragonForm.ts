import { AbstractControl, FormGroup } from '@angular/forms';
import { Dragon } from '../Dragon';

export interface DragonForm extends FormGroup {
  value: Dragon;
  controls: {
    email: AbstractControl;
    password: AbstractControl;
  };
}
