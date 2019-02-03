import { EventEmitter, Output } from '@angular/core';

export abstract class SocialLoginButton {
  @Output() pressed = new EventEmitter<string>();
  protected readonly provider: string;

  onClick(): void {
    console.debug("SocialLoginButton:onClick");
    this.pressed.emit(this.provider);
  }
}
