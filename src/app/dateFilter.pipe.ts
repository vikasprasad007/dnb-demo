import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'transactionDateFilter'
})
export class DateFilterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val) => {
            if (args.startDate == null) {
                return true;
            }else if(args.startDate != undefined){
                let rVal = (new Date(val.transactionDateTime) > new Date(args.startDate) && new Date(val.transactionDateTime) < new Date(args.endDate));
                return rVal;
            }else{
                return true;
            }
           
        })

    }

}