import { Role } from "./enum.js";
export interface DataTypeOfUser {
    id : number;
    firstName: string;
    middleName:string;
    lastName : string;
    email:string;
    phone:string;
    role:Role;
    address:string;
    // length:number;
    // data : Array<string>;
}
export interface validateVar{
    firstName: string;
    middleName:string;
    lastName : string;
    email:string;
    phone:string;
    address:string;
    editedData:string[];
}