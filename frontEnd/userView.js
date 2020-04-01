import { Role } from "./enum.js";
import { dataFetch } from "./DataFetch.js";
import { addEvent, removeEvent } from "./ButtonsAction.js";
import { objValidation } from "./formValidation.js";
import { error } from "./showError.js";
import { addUserBtn, objAddUser } from "./addUser.js";
export class UserTable {
    getUsers(users) {
        document.getElementById("loadData").style.display = "none";
        document.getElementById("refreshData").style.display = "block";
        document.getElementById("table").style.visibility = "visible";
        addUserBtn.style.display = "block";
        let tableData = document.getElementById("userData");
        for (let i = 0; i < users.length; i++) {
            let row = tableData.insertRow();
            row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].firstName}</span>`;
            row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].middleName}</span>`;
            row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].lastName}</span>`;
            row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].email}</span>`;
            row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].phone}</span>`;
            row.insertCell().innerHTML = `<span id = "role${+i}"> ${Role[users[i].role]}</span>`;
            row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].address}</span>`;
            row.insertCell().innerHTML = `<input type = "button" class = "w3-button" id = "edit${+i}" value = "EDIT" >`;
            row.insertCell().innerHTML = `<input type = "button" class = "w3-button deleteBtn" id = "delete${+i}" value = "DELETE" >`;
        }
    }
    async deleteRecord(row) {
        let table = document.getElementById("userData");
        let current = objUserTable.currentRow(row);
        let deleteUrl = `http://localhost:5000/api/users${current}`;
        fetch(deleteUrl)
            .catch((error) => {
            console.error('Error:', error);
        });
        table.deleteRow(current);
    }
    editRecord(rowElement, rowNumber) {
        removeEvent();
        let cloneData = [];
        let editButton = document.getElementById("edit" + rowNumber);
        editButton.setAttribute("value", "SAVE");
        async function pass() {
            await objUserTable.saveRecord({ rowElement, rowNumber, cloneData });
        }
        editButton.onclick = pass;
        let deleteButton = document.getElementById("delete" + rowNumber);
        deleteButton.setAttribute("value", "CANCEL");
        deleteButton.onclick = function () {
            objUserTable.cancel(cloneData, rowNumber, roleData);
        };
        for (let i = 0; i < 6; i++) {
            let selectedElements = document.getElementsByClassName("element" + rowNumber)[i];
            cloneData[i] = selectedElements.textContent;
            selectedElements.innerHTML = `<input class = "inputData" type = "text" placeholder ="Enter the Text"  value = "${cloneData[i]}">`;
        }
        let roleOption = document.getElementById("role" + rowNumber);
        let roleData = roleOption.innerHTML;
        roleOption.innerHTML = `<select id ="drop"><option>${roleData}</option><option>ADMIN</option><option>DEVELOPER</option><option>MANAGER</option></select>`;
    }
    cancel(cloneData, rowNumber, roleData) {
        for (let i = 0; i < 6; i++) {
            let selectedElements = document.getElementsByClassName("element" + rowNumber)[i];
            selectedElements.innerHTML = cloneData[i];
        }
        let role = document.getElementById("role" + rowNumber);
        role.innerHTML = roleData;
        let editButton = document.getElementById("edit" + rowNumber);
        editButton.setAttribute("value", "EDIT");
        editButton.removeAttribute('click');
        let deleteButton = document.getElementById("delete" + rowNumber);
        deleteButton.setAttribute("value", "DELETE");
        error.style.display = "none";
        setTimeout(addEvent, 400);
    }
    currentRow(rowElement) {
        let currentRow = rowElement.parentNode.parentNode.rowIndex - 1;
        return currentRow;
    }
    async saveRecord({ rowElement, rowNumber, cloneData }) {
        console.log("does this executes?");
        let result = objValidation.formValidate(rowElement, rowNumber, cloneData);
        let selectRole = document.getElementById("drop");
        let roleData = selectRole.value;
        let role = document.getElementById("role" + rowNumber);
        if (result == undefined) {
            objUserTable.sameRecord(rowElement, rowNumber);
            return;
        }
        role.innerHTML = roleData;
        error.style.display = "none";
        let saveButton = document.getElementById("edit" + rowNumber);
        saveButton.setAttribute("value", "EDIT");
        let deleteButton = document.getElementById("delete" + rowNumber);
        deleteButton.setAttribute("value", "DELETE");
        addUserBtn.disabled = false;
        setTimeout(addEvent, 400);
    }
    sameRecord(rowElement, rowNumber) {
        let cloneData = [];
        let editButton = document.getElementById("edit" + rowNumber);
        editButton.setAttribute("value", "SAVE");
        async function pass() {
            await objUserTable.saveRecord({ rowElement, rowNumber, cloneData });
        }
        editButton.onclick = pass;
    }
    refreshTable() {
        let table = document.getElementById("userData");
        table.innerHTML = "";
        dataFetch();
        removeEvent();
        addEvent();
    }
}
export let objUserTable = new UserTable();
objAddUser.addUserButton();
