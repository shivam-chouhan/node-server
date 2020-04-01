class AfterValidation {
    afterValidation(rowNumber, editedData) {
        for (let j = 0; j < 6; j++) {
            let selectedElements = document.getElementsByClassName("element" + rowNumber)[j];
            selectedElements.innerHTML = editedData[j];
        }
    }
}
export let objAfterValidation = new AfterValidation();
