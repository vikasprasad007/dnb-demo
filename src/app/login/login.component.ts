import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output('triggerHome') triggerHome = new EventEmitter();

  viewHeight = (window.innerHeight * 0.8);
  viewWidth = this.viewHeight * 1.75;

  displayHeight = this.viewHeight + 'px';//'80%';
  displayWidth = this.viewWidth + 'px';//(100 * this.viewWidth / window.innerWidth) + '%';

  viewUrl = '../assets/Layer.png';
  logoUrl = '../assets/logo.png';

  errorTxt = "";

  isLoading = false;

  viewLeft = (window.innerWidth - this.viewWidth) / 2;
  displayLeft = this.viewLeft + 'px';
  loginBlockWidth = (this.viewWidth - this.viewHeight) + 'px';

  emailTxt = "";
  passwordTxt = "";

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    console.log(window.innerHeight, this.viewHeight, this.viewWidth, window.innerWidth, this.displayWidth);
  }

  Submit() {

    if (this.emailTxt.trim() != "" && this.passwordTxt.trim() != "") {
      this.isLoading = true;
      this.http.get(environment.login + "/" + this.emailTxt.trim()).subscribe(resp => {
        console.log("login");
        console.log(Object.keys(resp).length);
        this.isLoading = false;
        if (Object.keys(resp).length != 0) {
          var now = new Date();
          now.setMonth(now.getMonth() - 1);
          document.cookie = "account=";
          document.cookie = "userid=";
          document.cookie = "expires=" + now.toUTCString();

          now = new Date();
          now.setMonth(now.getMonth() + 1);
          document.cookie = "account=" + resp[0].accountNumber;
          document.cookie = "userid=" + this.emailTxt.trim();
          document.cookie = "expires=" + now.toUTCString();

          this.triggerHome.emit();

          this.router.navigateByUrl('home');
        } else {
          this.emailTxt = "";
          this.passwordTxt = "";
          this.errorTxt = "User does not exist."
          this.RemoveErrorMsg();
        }

      }, error => {
        this.isLoading = false;
        this.emailTxt = "";
        this.passwordTxt = "";
        this.errorTxt = error.statusText;
        this.RemoveErrorMsg();
        console.log(error);
      });
    }
  }

  RemoveErrorMsg() {
    var curObj = this;
    setTimeout(function () {
      curObj.errorTxt = "";
    }, 5000);
  }

}
