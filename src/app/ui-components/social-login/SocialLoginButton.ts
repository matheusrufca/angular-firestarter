import { EventEmitter, Output } from '@angular/core';

export abstract class SocialLoginButton {
  protected readonly provider: string;
  @Output()
  pressed = new EventEmitter<string>();
  onClick(): void {
    console.debug("SocialLoginButton:onClick");
    this.pressed.emit(this.provider);
  }
}
