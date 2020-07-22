import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PayeeService } from '../payee/services/payee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output('triggerHome') triggerHome = new EventEmitter();

  logoUrl = "../assets/logo.png";
  selectedItem = "dashboard";

  constructor(private router: Router, private payeeService: PayeeService) {
    console.log("constructor:", this.selectedItem);
  }

  ngOnInit() {
    console.log("ngOnInit:", this.selectedItem);
  }

  Logout() {
    var now = new Date();
    now.setMonth(now.getMonth() - 1);
    document.cookie = "account=";
    document.cookie = "expires=" + now.toUTCString();
    this.triggerHome.emit();
    this.router.navigateByUrl('signin');
  }

  openPayeeView(target) {
    if (target == 'payee') {
      this.selectedItem = "payee";
    } else {
      this.selectedItem = "transfer";
    }
  }

  openLoanView(target) {
    if (target == 'applyloan') {
      this.selectedItem = "loanapply";
    } else {
      this.selectedItem = "loan";
    }
  }

  updateCurrentComponent(currentComponent){
    this.payeeService.setCurrentComponent(currentComponent);
  }

}
