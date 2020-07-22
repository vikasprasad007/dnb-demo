import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PayeeService } from '../payee/services/payee.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  @Output('triggerLoan') triggerLoan = new EventEmitter();

  presentImgUrl1 = "../assets/customizeLoan.png";
  presentImgUrl2 = "../assets/apply-img.png";
  presentImgUrl3 = "../assets/approval.png";
  accountNoTxt = "";
  activationMsg = "";
  loanListData = [];

  constructor(private payeeService: PayeeService) {
    var accountNo = document.cookie.split(";")[0];
    this.accountNoTxt = accountNo.split("=")[1].trim();
  }

  ngOnInit() {
    this.UpdateLoanList();
  }

  UpdateLoanList() {
    console.log("inside UpdateLoanList:", this.payeeService.getCurrentComponent());
    if (this.payeeService.getCurrentComponent() != "loan") {
      return;
    }
    var curObj = this;

    this.payeeService.getLoanList(this.accountNoTxt).subscribe((loanList) => {
      console.log("getLoanList");
      this.loanListData = Object.assign(loanList);
      console.log(this.loanListData);
      for (var i = 0; i < this.loanListData.length; i++) {
        if (this.loanListData[i].newNotification == "Y" || this.loanListData[i].newNotification == "y") {

          if(this.loanListData[i].status == 'approved') {
            this.activationMsg = "Your loan request " + this.loanListData[i].loanAcctId + " of amount '" + this.loanListData[i].loanAmt + "' has been approved.";
          } else {
            this.activationMsg = "Your loan request " + this.loanListData[i].loanAcctId + ",status chagned to " + this.loanListData[i].status+".";
          }
          

          setTimeout(function () {
            curObj.activationMsg = "";
          }, 60000);
          break;
        }
      }
    });


    setTimeout(function () {
      curObj.UpdateLoanList();
    }, 30000);
  }

  applyForLoan() {
    this.triggerLoan.emit("applyloan");
  }
}
