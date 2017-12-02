import { Injectable } from '@angular/core';
import {falseIfMissing} from "protractor/built/util";

@Injectable()
export class MessageService {

  private message: string = '';
  public errorMesage: boolean = false;
  public successMessage: boolean = false;

  constructor() { }

  public setSuccessMessage (message: string) {
    this.message = message;
    this.successMessage = true;
  }

  public setErrorMessage (message: string) {
    this.message = message;
    this.errorMesage = true;
  }

  public consumeMessage () {
    let res = this.message;
    this.message = null;
    this.errorMesage = false;
    this.successMessage = false;
    return res;
  }

}
