import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options, ChangeContext, PointerType, LabelType} from 'ng5-slider';
import { PayeeService } from '../payee/services/payee.service';

@Component({
  selector: 'app-loan-apply',
  templateUrl: './loan-apply.component.html',
  styleUrls: ['./loan-apply.component.scss']
})
export class LoanApplyComponent implements OnInit {

  @Output('triggerLoan') triggerLoan = new EventEmitter();

  isLoading = false;

  loanAmountOptions: Options = {
    floor: 5000,
    ceil: 50000,
    step:1000,
    showSelectionBar: true,
    translate: (value: number, label: LabelType): string => {
      return '$' + value.toLocaleString('en');
    }
  };

  loanPeriodOptions: Options = {
    floor: 1,
    ceil: 20,
    step:1,
    showSelectionBar: true
  };

  estFeeOptions: Options = {
    floor: 1,
    ceil: 100,
    showSelectionBar: true
  };

  monthlyFeeOptions: Options = {
    floor: 1,
    ceil: 100,
    showSelectionBar: true
  };

  loanInitalAmount: number = 8000;
  loanInitalPeriod: number = 3;
  monthlyFeePeriod: number = 1;
  estFeePeriod: number = 1;

  accountNoTxt = "";

  constructor(private payeeService: PayeeService) {
    var accountNo = document.cookie.split(";")[0];
    this.accountNoTxt = accountNo.split("=")[1].trim();
  }

  ngOnInit() {
  }

  ApplyLoan() {
    console.log(this.loanInitalAmount, this.loanInitalPeriod, this.estFeePeriod, this.monthlyFeePeriod);
    this.isLoading = true;
    const loanData = {
      "uuid": this.accountNoTxt,
      "requestedLoanAmt": this.loanInitalAmount,
      "requestedLoanTenure": this.loanInitalPeriod,
      "interestRate": this.monthlyFeePeriod
    };
    this.payeeService.postLoan(loanData).subscribe((payeeAddResponse) => {
      console.log("getLoanList");
      console.log(payeeAddResponse);
      this.isLoading = false;
      this.loanInitalAmount = 8000;
      this.loanInitalPeriod = 20;
      this.monthlyFeePeriod = 1;
      this.estFeePeriod = 1;
    }, error => {
      this.isLoading = false;
      console.log("getLoanList error");
      console.log(error);
    });
  }

  BackToLoan() {
    this.triggerLoan.emit('loan');
  }

}
