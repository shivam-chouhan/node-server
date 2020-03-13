import { objUserTable } from "./userView.js";
import { urlData } from "./DataFetch.js";
export let addUserBtn = document.createElement('button');
class AddUser {
    addUserButton() {
        addUserBtn.innerHTML = 'ADD USER';
        addUserBtn.setAttribute('class', 'w3-button refresh');
        document.body.appendChild(addUserBtn);
        addUserBtn.style.display = 'none';
        addUserBtn.onclick = async function () {
            let users = await fetch(urlData)
                .then(resp => { return (resp.json()); });
            objAddUser.addUserData(users);
        };
    }
    addUserData(users) {
        let i = users.length;
        let addUser = {
            "id": i,
            "firstName": "",
            "middleName": "",
            "lastName": "",
            "email": "",
            "phone": "",
            "role": 0,
            "address": ""
        };
        users.push(addUser);
        let table = document.getElementById('userData');
        table.innerHTML = "";
        objUserTable.getUsers(users);
        addUserBtn.disabled = true;
        let rowElement = document.getElementById('edit' + i);
        let rowNumber = i;
        objUserTable.editRecord(rowElement, rowNumber);
        fetch('http://localhost:5000/api/savedata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addUser),
        })
            .then((response) => response.json())
            .then((addUser) => {
            console.log('Success');
        })
            .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export let objAddUser = new AddUser();
