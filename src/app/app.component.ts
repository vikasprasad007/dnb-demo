
import { Component } from '@angular/core';
import { AppConfigService } from './providers/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Digital National Bank';
  isAlreadyLoggedId = false;

  constructor(private config: AppConfigService) {
    console.log("-----configMap data----");
    console.log(this.config.getConfig());
  }

  ngOnInit() {
    if (document.cookie == "") {
      this.isAlreadyLoggedId = false;
    } else {
      var accountNo = document.cookie.split(";")[0];
      if (accountNo.indexOf("account") == -1) {
        var now = new Date();
        now.setMonth(now.getMonth() - 1);
        document.cookie = "account=";
        document.cookie = "expires=" + now.toUTCString();
        this.isAlreadyLoggedId = false;
      } else {
        var accountNoTxt = accountNo.split("=")[1].trim();
        if (accountNoTxt == "") {
          this.isAlreadyLoggedId = false;
        } else {
          this.isAlreadyLoggedId = true;
        }
      }

    }
  }
}

