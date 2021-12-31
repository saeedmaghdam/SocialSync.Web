import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(dateJson: any, args?: any): any {
    const keys = Object.keys(dateJson);

    let items = [];
    let length = keys.length;
    for (let i = 0; i < length / 2; i++)
      items.push({ key: keys[i], value: keys[length - (length / 2) + i] });

    return items;
  }
}
