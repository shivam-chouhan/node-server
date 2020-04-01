import { DataTypeOfUser } from "./interface.js";
import { Role } from "./enum.js";
import {dataFetch } from "./DataFetch.js";
import { addEvent,removeEvent} from "./ButtonsAction.js";
import { objValidation } from "./formValidation.js";
import { error } from "./showError.js";
import { addUserBtn, objAddUser } from "./addUser.js";


export class UserTable{
    getUsers(users:DataTypeOfUser[]){
       document.getElementById("loadData")!.style.display="none";
       document.getElementById("refreshData")!.style.display="block";
       document.getElementById("table")!.style.visibility="visible";
       addUserBtn.style.display="block";
    let tableData: HTMLTableElement = document.getElementById("userData") as HTMLTableElement;
       for(let i=0;i<users.length;i++)
       {
           let row:HTMLTableRowElement = tableData.insertRow();
           row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].firstName}</span>`
                 row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].middleName}</span>`
                 row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].lastName}</span>`
                 row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].email}</span>`
                 row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].phone}</span>`
                 row.insertCell().innerHTML = `<span id = "role${+i}"> ${Role[users[i].role]}</span>`
                 row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].address}</span>`
                 row.insertCell().innerHTML = `<input type = "button" class = "w3-button" id = "edit${+i}" value = "EDIT" >`;
                 row.insertCell().innerHTML = `<input type = "button" class = "w3-button deleteBtn" id = "delete${+i}" value = "DELETE" >`;
       }
       
   }
   async deleteRecord(row:Node){

    let table :HTMLTableElement= document.getElementById("userData") as HTMLTableElement;
    let current:number = objUserTable.currentRow(row);
    let deleteUrl = `http://localhost:5000/api/getUsers/${current}`;
     fetch(deleteUrl)
     .catch((error) => {
        console.error('Error:', error);});
     table.deleteRow(current);
    
 }

    editRecord(rowElement:Node, rowNumber:number){
       removeEvent();
       let cloneData:Array<string>=[];
       let editButton:HTMLButtonElement = document.getElementById("edit"+rowNumber) as HTMLButtonElement;
       editButton.setAttribute("value", "SAVE");
     async function  pass (){
        await objUserTable.saveRecord({rowElement,rowNumber,cloneData});
        
    }
       editButton.onclick = pass;
       
       let deleteButton:HTMLButtonElement = document.getElementById("delete"+rowNumber) as HTMLButtonElement;
       deleteButton.setAttribute("value","CANCEL");
       deleteButton.onclick = function(){
           objUserTable.cancel(cloneData,rowNumber,roleData);
       }
       for(let i=0;i<6;i++)
       {
           let selectedElements=document.getElementsByClassName("element"+rowNumber)[i];
           cloneData[i]=selectedElements.textContent!;
           selectedElements.innerHTML = `<input class = "inputData" type = "text" placeholder ="Enter the Text"  value = "${cloneData[i]}">`
       }
       let roleOption:HTMLTableRowElement = document.getElementById("role"+rowNumber) as HTMLTableRowElement;
       let roleData=roleOption.innerHTML;
       roleOption.innerHTML=`<select id ="drop"><option>${roleData}</option><option>ADMIN</option><option>DEVELOPER</option><option>MANAGER</option></select>`
   }
   cancel(cloneData:string[], rowNumber:number,roleData:string){
       for(let i=0;i<6;i++)
       {
           let selectedElements = document.getElementsByClassName("element"+rowNumber)[i];
           selectedElements.innerHTML = cloneData[i];
       }
       let role :HTMLTableRowElement= document.getElementById("role"+rowNumber)as HTMLTableRowElement;
       role.innerHTML = roleData;
       let editButton :HTMLButtonElement=document.getElementById("edit"+rowNumber) as HTMLButtonElement;
       editButton.setAttribute("value", "EDIT");
       editButton.removeAttribute('click')
       let deleteButton:HTMLButtonElement=document.getElementById("delete"+rowNumber) as HTMLButtonElement;
       deleteButton.setAttribute("value","DELETE");
       error.style.display = "none";
           setTimeout(addEvent,400);
   }
   currentRow(rowElement:Node){
       let currentRow :number= ((rowElement.parentNode as HTMLTableElement).parentNode as HTMLTableRowElement).rowIndex-1;
       return currentRow;
   }
   async saveRecord({ rowElement,rowNumber, cloneData }: {  rowElement:Node;rowNumber: number; cloneData: string[]; }){
       console.log("does this executes?")
       let result =objValidation.formValidate(rowElement,rowNumber,cloneData);
       let selectRole:HTMLSelectElement = document.getElementById("drop")as HTMLSelectElement;
       let roleData = selectRole.value;
       let role :HTMLTableRowElement= document.getElementById("role"+rowNumber) as HTMLTableRowElement;
       if(result == undefined)
       {
            objUserTable.sameRecord(rowElement,rowNumber);
           return;
        }
        role.innerHTML = roleData;
        error.style.display = "none";
       let saveButton:HTMLButtonElement = document.getElementById("edit"+rowNumber) as HTMLButtonElement;
       saveButton.setAttribute("value", "EDIT");
       let deleteButton:HTMLButtonElement=document.getElementById("delete"+rowNumber)as HTMLButtonElement;
       deleteButton.setAttribute("value", "DELETE");
       addUserBtn.disabled=false;
    setTimeout(addEvent,400);
    
  }
  sameRecord(rowElement:Node,rowNumber:number){
    let cloneData:Array<string>=[];
    let editButton:HTMLButtonElement = document.getElementById("edit"+rowNumber) as HTMLButtonElement;
    editButton.setAttribute("value", "SAVE");
  async function  pass (){
     await objUserTable.saveRecord({rowElement,rowNumber,cloneData});}
    editButton.onclick = pass;
    }

  

   refreshTable(){
       let table:HTMLTableElement= document.getElementById("userData") as HTMLTableElement;
       table.innerHTML="";
       dataFetch();
       removeEvent();
       addEvent();
   }
}
export let objUserTable = new UserTable();
objAddUser.addUserButton();

