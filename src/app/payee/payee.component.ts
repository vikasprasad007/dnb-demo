import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PayeeService } from './services/payee.service';

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.scss']
})
export class PayeeComponent implements OnInit {

  @Output('triggerPayee') triggerPayee = new EventEmitter();
  accountNoTxt = '';
  errorMsgTxt = "";
  requestStatusSent = false;
  isLoading = false;
  successImageUrl = "../assets/confirmation.png";
  payeeDetail = {
    "name": "",
    "nickName": "",
    "account": "",
    "confirmAccount": "",
    "ifsc": "",
    "mobile": ""
  };

  constructor(private payeeService: PayeeService) {
    var accountNo = document.cookie.split(";")[0];
    this.accountNoTxt = accountNo.split("=")[1].trim();
  }

  ngOnInit() {
  }

  addPayee() {
    console.log(this.payeeDetail);
    if (this.payeeDetail.name != "" && this.payeeDetail.nickName != "" && this.payeeDetail.account != "" && this.payeeDetail.confirmAccount != "" && this.payeeDetail.ifsc != "" && this.payeeDetail.mobile != "") {

      if (this.payeeDetail.account != this.payeeDetail.confirmAccount) {
        return;
      }

      this.isLoading = true;
      const payeeData = {
        account_number: this.accountNoTxt,
        payee_account_number: this.payeeDetail.account,
        payee_name: this.payeeDetail.name,
        payee_email: `${this.payeeDetail.name}@doamin.com`,
        ifsc_code: this.payeeDetail.ifsc
      };
      this.payeeService.addpayee(payeeData).subscribe((payeeAddResponse) => {
        console.log(payeeAddResponse);
        this.requestStatusSent = true;
        this.isLoading = false;
        this.payeeDetail = {
          "name": "",
          "nickName": "",
          "account": "",
          "confirmAccount": "",
          "ifsc": "",
          "mobile": ""
        };
      }, error => {
        this.isLoading = false;
      });

    } else {
      this.requestStatusSent = false;
    }
  }

  backFromPayee() {
    this.triggerPayee.emit('fund');
  }

  AccountChange(para) {
    console.log(para);
  }

  CheckAccount(){
    console.log(this.payeeDetail);
    this.payeeDetail.confirmAccount = this.payeeDetail.confirmAccount == null ? "" : this.payeeDetail.confirmAccount;
    this.payeeDetail.account = this.payeeDetail.account == null ? "" : this.payeeDetail.account;
    if(this.payeeDetail.confirmAccount == this.payeeDetail.account){
      this.errorMsgTxt = "";
    }else{
      this.errorMsgTxt = "*Account Number and Confirm Account Number should not be different.";
    }
  }
}


