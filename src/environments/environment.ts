// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  payeeService: {
    get: 'http://payee-dnb.eu-gb.mybluemix.net/api/payee',
    account: 'http://payee-dnb.eu-gb.mybluemix.net/api/payee/account',
  },
  recentTransaction:'http://dnb-transaction-cpfa-dnb.ocp-app-mod-055be62028fec1a956793dedf3faa04a-0001.us-east.containers.appdomain.cloud/api/v1/transaction',
  fundTransfer:'http://dnb-transfer-cpfa-dnb.ocp-app-mod-055be62028fec1a956793dedf3faa04a-0001.us-east.containers.appdomain.cloud/api/v1/fund_transfer',
  login:'http://dnb.eu-gb.mybluemix.net/api/v1/accounts/user',
  loanlist:'http://dnb-loan-process-cpfa-dnb.ocp-app-mod-055be62028fec1a956793dedf3faa04a-0001.us-east.containers.appdomain.cloud/api/v1/loandtl',
  loan:'http://dnb-loan-req-cpfa-dnb.ocp-app-mod-055be62028fec1a956793dedf3faa04a-0001.us-east.containers.appdomain.cloud/api/v1/loan'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
