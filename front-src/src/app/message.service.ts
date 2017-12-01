import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  public message: string = null;
  public errorMesage: boolean= false;
  public successMessage: boolean = false;

  constructor() { }

  public setErrorMessage (message: string) {
    this.message = message;
    this.errorMesage = true;
  }

  public setSuccessMessage (message: string) {
    this.message = message;
    this.errorMesage = true;
  }

  public clearMessage (message: string) {
    this.message = message;
    this.errorMesage = true;
  }

}
