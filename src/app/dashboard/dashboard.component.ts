import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PayeeService } from '../payee/services/payee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Output('triggerLoan') triggerLoan = new EventEmitter();

  cardUrl = "../assets/card.png";
  atmMoreUrl = "../assets/Layer33.png";
  receiverImage = "../assets/Layer13.png";
  electricityImageUrl = "../assets/Layer24.png";
  internetImageUrl = "../assets/Layer25.png";
  insuranceImageUrl = "../assets/Layer26.png";
  waterImageUrl = "../assets/Layer27.png";
  accStatementImageUrl = "../assets/Layer28.png";
  statementDownloadImageUrl = "../assets/Layer29.png";
  mobileBankingImageUrl = "../assets/Layer30.png";
  cloudBankingImageUrl = "../assets/Layer31.png";
  dateFilterLogo = "../assets/Layer34.png";
  typeFilterLogo = "../assets/Layer36.png";
  ongoingLoanImg = "../assets/ic1.png";
  approvalLoanImg = "../assets/ic2.png";
  upcomingEmiImg = "../assets/ic3.png";

  accountHolderName = "Gomti Prabha";
  accountNumber = "";
  payMoreImageUrl = "";
  receiverLength = 10;
  accStatementSelect = 'account';
  selected: { start: '01/01/2001', end: '01/01/2001' };

  accountBallance = 0;
  lastTransactionAmount = 0;
  ongoingLoanCount = 0;
  approvalLoanCount = 0;
  today = new Date();
  upcomingEmiCount = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7);
  searchText = "";

  arrowImg = "../assets/ar1.png";
  isDesc = true;

  single: any[];
  upcomingPayment = [{
    "logo": "../assets/Layer38.png",
    "name": "Playstation Plus",
    "type": "Subscription",
    "charges": "29,49 USD",
    "time": "December 15, 2018",
    "bgcolor": "#1D3C8C"
  }, {
    "logo": "../assets/Layer39.png",
    "name": "HBO Premium",
    "type": "Subscription",
    "charges": "9,90 USD",
    "time": "December 24, 2018",
    "bgcolor": "#47484A"
  }, {
    "logo": "../assets/Layer40.png",
    "name": "Netflix Premium",
    "type": "Payment card",
    "charges": "19,00 USD",
    "time": "December 28, 2018",
    "bgcolor": "#ED402E"
  }];

  transactionTada = [];

  view: any[] = [300, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  typeFilter = "";

  expensesAmount = 0;

  colorScheme = {
    domain: ['#e22121', '#e7e7e7']
  };

  constructor(private payeeService: PayeeService) {
    console.log(document.cookie);
    var accountNo = document.cookie.split(";")[0];
    var accountNoTxt = accountNo.split("=")[1].trim();
    var userId = document.cookie.split(";")[1];
    var userIdTxt = userId.split("=")[1].trim();

    this.accountNumber = accountNoTxt;

    console.log(accountNoTxt, userIdTxt);
    //Block to get transaction detail

    this.payeeService.getRecentTransaction(accountNoTxt).subscribe((resp) => {
      console.log("getRecentTransaction");
      console.log(resp);
      this.transactionTada = resp['transactions'];
      if (this.transactionTada.length != 0) {
        this.lastTransactionAmount = this.transactionTada[0].amount;
      }
    }, error => {
      console.log("getRecentTransaction error");
      console.log(error);
    });

    this.payeeService.getAccountDetail(userIdTxt).subscribe((resp) => {
      console.log("getAccountDetail");
      console.log(resp[0].accountBalance);
      this.accountBallance = resp[0].accountBalance;
    }, error => {
      console.log("getAccountDetail error");
      console.log(error);
    });

    this.payeeService.getLoanList(accountNoTxt).subscribe((loanList) => {
      console.log("getLoanList");
      var loanListData = Object.assign(loanList);
      for (var i = 0; i < loanListData.length; i++) {
        if (loanListData[i].status == "DISBURSED") {
          this.ongoingLoanCount = this.ongoingLoanCount + 1;
        } else if (loanListData[i].status == "PENDING") {
          this.approvalLoanCount = this.approvalLoanCount + 1;
        }
      }
    });

    var single = [{
      "name": "Your Expenses",
      "value": 400
    },
    {
      "name": "Total",
      "value": 1000
    }
    ];
    this.single = single;
    this.expensesAmount = 400;
    Object.assign(this, { single });
  }

  ngOnInit() {
  }

  onSelectionChange(value) {
    var single = [];
    if (value == "d") {
      single = [{
        "name": "Your Expenses",
        "value": 45
      },
      {
        "name": "Total",
        "value": 100
      }
      ];
      this.single = single;
      this.expensesAmount = 45;
    } else if (value == "y") {
      single = [{
        "name": "Your Expenses",
        "value": 3400
      },
      {
        "name": "Total",
        "value": 10000
      }
      ];
      this.single = single;
      this.expensesAmount = 3400;
    } else {
      single = [{
        "name": "Your Expenses",
        "value": 400
      },
      {
        "name": "Total",
        "value": 1000
      }
      ];
      this.single = single;
      this.expensesAmount = 400;
    }

    Object.assign(this, { single });
  }

  ApplyNewLoan() {
    this.triggerLoan.emit("loan");
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction   
    this.arrowImg = this.isDesc ? "../assets/ar1.png" : "../assets/ar2.png";
    //this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.transactionTada.sort(function (a, b) {
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

  Exchange() {

  }

}
