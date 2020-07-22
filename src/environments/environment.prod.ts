export const environment = {
  production: true,
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
