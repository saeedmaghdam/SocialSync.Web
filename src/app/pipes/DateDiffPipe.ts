import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'dateDiff'
})
export class DateDiffPipe implements PipeTransform {
  transform(dateJson: any, args?: any): any {
    let currentDate = new Date();
    let date = new Date(dateJson);
    let days = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) ) /(1000 * 60 * 60 * 24));

    switch (days){
      case 0:
        return "Today";
      case 1:
        return "Yesterday";
      default:
        return `${days} days ago`;
    }
  }
}
