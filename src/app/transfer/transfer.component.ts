import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PayeeService } from '../payee/services/payee.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {


  @Output('triggerPayee') triggerPayee = new EventEmitter();

  headerImageUrl = "../assets/blue_bg.png";
  bankTransferImageUrl = "../assets/bank_icon.png";
  mcardTransferImageUrl = "../assets/card_icon.png";
  accTransferImageUrl = "../assets/user.png";
  dcardTransferImageUrl = "../assets/card_icon.png";
  arrowImg = "../assets/ar1.png";
  transferRepresentUrl = "../assets/trnsfer.png";
  accountNoTxt = "";
  isLoading = false;
  transferTypeSelected = 0;

  activationMsg = "";

  isDesc = true;

  fundTransferDetail = {
    "amount": "",
    "payeeAccount": null,
    "paymentType": 0,
    "desc" : ""
  };

  payeeList = [];

  transferListData = [];

  constructor(private payeeService: PayeeService) {
    var accountNo = document.cookie.split(";")[0];
    this.accountNoTxt = accountNo.split("=")[1].trim();
    console.log(this.accountNoTxt);
  }

  ngOnInit() {
    this.UpdateTransferList();
  }

  UpdateTransferList() {
    if (this.payeeService.getCurrentComponent() != "transfer") {
      return;
    }

    var curObj = this;

    this.payeeService.getPayeeByAccountId(+this.accountNoTxt).subscribe((payeeList) => {
      console.log("getPayeeByAccountId");
      this.payeeList = payeeList['payees'];
      console.log(this.payeeList);
      
    });

    this.payeeService.getFundTransaction(this.accountNoTxt).subscribe((payeeList) => {
      console.log("getFundTransaction");
      console.log(payeeList);
      this.transferListData = payeeList['transfers'];
      this.arrowImg = "../assets/ar1.png";
      for (var i = 0; i < this.transferListData.length; i++) {
        if (this.transferListData[i].notification == "Y" || this.transferListData[i].notification == "y") {
          this.activationMsg = "Update: amount of " + this.transferListData[i].amount + " has been transfered to " + this.transferListData[i].txName + " Acc-." + this.transferListData[i].txAccount;
          setTimeout(function () {
            curObj.activationMsg = "";
          }, 60000);
          break;
        }
      }
    });

    
    setTimeout(function () {
      curObj.UpdateTransferList();
    }, 30000);
  }

  addPayee() {
    this.triggerPayee.emit('payee');
  }

  FundTransfer() {

    console.log(this.fundTransferDetail.payeeAccount, typeof this.fundTransferDetail.payeeAccount);
    if (this.fundTransferDetail.amount && this.fundTransferDetail.amount != "" && this.fundTransferDetail.payeeAccount != null) {
      if (typeof this.fundTransferDetail.payeeAccount == "string") {
        this.fundTransferDetail.payeeAccount = JSON.parse(this.fundTransferDetail.payeeAccount);
      }

      this.isLoading = true;

      var fundDetails = {
        "accountNumber": this.accountNoTxt.toString(),
        "payeeAccount": this.fundTransferDetail.payeeAccount.account_number.toString(),
        "payeeName": this.fundTransferDetail.payeeAccount.name,
        "transactionDesc": this.fundTransferDetail.desc,//this.fundTransferDetail.paymentType == 0 ? "bank-transfer" : (this.fundTransferDetail.paymentType == 1 ? "master-card" : (this.fundTransferDetail.paymentType == 2 ? "account-bank" : "cards")),
        "amount": this.fundTransferDetail.amount
      };

      var currObj = this;
      this.payeeService.fundTransfer(fundDetails).subscribe((fundResp) => {
        console.log("fundTransfer");
        console.log(fundResp);
        currObj.isLoading = false;
        currObj.fundTransferDetail.amount = "";
        currObj.fundTransferDetail.payeeAccount = null;
        currObj.fundTransferDetail.desc = "";
        //alert("Your fund transfer successfully.");
      }, error => {
        currObj.isLoading = false;
        console.log("fundTransfer error");
        console.log(error);
      });
    }

  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction   
    this.arrowImg = this.isDesc ? "../assets/ar1.png" : "../assets/ar2.png";
    //this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.transferListData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

}
