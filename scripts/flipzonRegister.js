function register() {
	var name = document.getElementById("name");
	var number = document.getElementById("number");
	var dAddress = document.getElementById("dAddress");
	var pAddress = document.getElementById("pAddress");
	var pincode = document.getElementById("pincode");
	var password = document.getElementById("password");

	console.log("Hello");

	var nameError = document.getElementById("nameError");
	var numberError = document.getElementById("numberError");
	var dAddressError = document.getElementById("dAddressError");
	var pAddressError = document.getElementById("pAddressError");
	var pincodeError = document.getElementById("pincodeError");
	var passwordError = document.getElementById("passwordError");

	nameError.style.display = 'none';
	numberError.style.display = 'none';
	dAddressError.style.display = 'none';
	pAddressError.style.display = 'none';
	pincodeError.style.display = 'none';
	passwordError.style.display = 'none';

	if (!name.value) {

		nameError.style.removeProperty("display");
		return;

	}


	if (!number.value) {

		numberError.style.removeProperty("display");
		return;

	}


	if (!dAddress.value) {

		dAddressError.style.removeProperty("display");
		return;

	}


	if (!pAddress.value) {

		pAddressError.style.removeProperty("display");
		return;

	}

	if (!pincode.value) {

		pincodeError.style.removeProperty("display");
		return;

	}


	if (!password.value) {

		passwordError.style.removeProperty("display");
		return;

	}

	var obj = {
		name: name.value,
		number: number.value,
		dAddress: dAddress.value,
		pAddress: pAddress.value,
		pincode: pincode.value,
		password: password.value,
	}




	localStorage.setItem(name.value, JSON.stringify(obj));


	name.value = '';
	number.value = '';
	dAddress.value = '';
	pAddress.value = '';
	pincode.value = '';
	password.value = '';
}
