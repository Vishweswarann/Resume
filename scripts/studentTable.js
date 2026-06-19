var nameArr = [];
var numberArr = [];
var mailArr = [];

const nameInput = document.getElementById("name");
const number = document.getElementById("number");
const mail = document.getElementById("mail");

var tableBody = document.getElementById("tableBody");

var editIndex = -1;

function handleSave() {

	if (nameInput.value == '' || number.value == '' || mail.value == '') {
		window.alert("Enter all the details");
		return;
	}

	if (editIndex != -1) {

		nameArr[editIndex] = nameInput.value;
		numberArr[editIndex] = number.value;
		mailArr[editIndex] = mail.value;
		editIndex = -1;
	}



	else {

		nameArr.push(nameInput.value);
		numberArr.push(number.value);
		mailArr.push(mail.value);

	}
	nameInput.value = '';
	number.value = '';
	mail.value = '';


	display();


}


function display() {

	tableBody.innerHTML = ``;


	nameArr.forEach((name, index) => {
		tableBody.innerHTML += `<td> ${name} </td> <td> ${numberArr[index]} </td> <td> ${mailArr[index]} </td> <td> <button onClick='edit(${index})'> Edit </button> <button onClick='deletee(${index})'> Delete </button>`;

	})
}



function edit(index) {


	var tempName = nameArr[index];
	var tempNumber = numberArr[index];
	var tempMail = mailArr[index];

	nameInput.value = tempName;
	number.value = tempNumber;
	mail.value = tempMail;

	editIndex = index;


}

function deletee(index) {

	nameArr.splice(index, 1)
	mailArr.splice(index, 1)
	numberArr.splice(index, 1)

	display();

}
