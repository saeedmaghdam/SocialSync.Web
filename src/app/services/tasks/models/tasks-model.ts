import { BaseModel } from "src/app/models/base-model";

export class TasksResponseModel extends BaseModel {
  data!: TasksModelData;
}

export class TasksModelData {
    action!: string;
    selector!: TasksSelector; 
    product!: TasksProduct; 
}

export class TasksSelector {
    productId!: string;
    title!: string; 
}
  
export class TasksProduct { 
    title!: string;
    description!: string;
    price!: string;
    url!: string;
    imageUrls!: [];
}
