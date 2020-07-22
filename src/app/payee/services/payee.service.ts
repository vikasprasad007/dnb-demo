import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayeeService {

  currentComponent = "";

  constructor(private http: HttpClient) { }

  getAccountDetail(id: string) {
    return this.http.get(environment.login + "/" + id);
  }

  getRecentTransaction(id: string) {
    return this.http.get(environment.recentTransaction + "?accountNum=" + id);
  }

  getPayee(id: string) {
    return this.http.get(environment.payeeService.get);
  }

  addpayee(payeeData: {}) {
    return this.http.post(environment.payeeService.get, payeeData);
  }

  getPayeeByAccountId(account_number: number) {
    return this.http.get(environment.payeeService.account + '/' + account_number);
  }

  fundTransfer(fundDetails: {}) {
    console.log(fundDetails, environment.fundTransfer);
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    //headers.set('Accept', "multipart/form-data");
    headers.set('Access-Control-Allow-Origin', "*");

    let params = new HttpParams();

    /*fundDetails = {
      "accountNumber": "3978316",
      "payeeAccount": "38603639",
      "payeeName": "abhishek s",
      "transactionDesc": "bank-transfer",
      "amount": 10
    };*/

    return this.http.post(environment.fundTransfer, fundDetails, { params, headers });
  }

  getFundTransaction(account_number: string) {
    return this.http.get(environment.fundTransfer + '/' + account_number);
  }

  getLoanList(account_number: string) {
    return this.http.get(environment.loanlist + '/' + account_number);
  }

  postLoan(loanDeatil: {}) {
    return this.http.post(environment.loan, loanDeatil);
  }

  setCurrentComponent(name: string) {
    this.currentComponent = name;
  }

  getCurrentComponent() {
    return this.currentComponent;
  }
}
