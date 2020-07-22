import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'transactionFilter'
})
export class SearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val) => {
            val.transactionType = val.transactionType == null ? "" : val.transactionType;
            val.targetAccount = val.targetAccount == null ? "" : val.targetAccount;
            val.status = val.status == null ? "" : val.status;
            val.transactionDesc = val.transactionDesc == null ? "" : val.transactionDesc;
            if (val == null) {
                return true;
            }
            args = args.toLocaleLowerCase();
            let rVal = (val.transactionType.toLocaleLowerCase().includes(args)) || (val.targetAccount.toLocaleLowerCase().includes(args)) || (val.transactionDesc.toLocaleLowerCase().includes(args)) || (val.status.toLocaleLowerCase().includes(args));
            return rVal;
        })

    }

}