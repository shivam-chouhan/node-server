import { objUserTable } from "./userView.js";
export class ClassGetID {
    passID(ID) {
        let length = ID.length;
        let IDno = ID.charAt(length - 1);
        if ((ID.charAt(length - 2) + ID.charAt(length - 1)) <= '99') {
            IDno = ID.charAt(length - 2) + ID.charAt(length - 1);
        }
        if (ID == "delete" + (IDno)) {
            let rowElement = document.getElementById(ID);
            console.log(rowElement);
            objUserTable.deleteRecord(rowElement);
        }
        else if (ID == "edit" + (IDno)) {
            let rowElement = document.getElementById(ID);
            let rowNumber = parseInt(IDno);
            objUserTable.editRecord(rowElement, rowNumber);
        }
    }
}
export let objClassGetID = new ClassGetID();
