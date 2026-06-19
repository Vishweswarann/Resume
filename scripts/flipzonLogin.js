function login() {


	var name = document.getElementById("name");
	var password = document.getElementById("password");

	if (name.value == '' || password.value == '') {

		var errorMsg = document.getElementById("errorMsg");
		errorMsg.style.removeProperty("display");
		console.log("False");
		return;
	}


	console.log(name.value);
	var checkPass = JSON.parse(localStorage.getItem(name.value));

	console.log(checkPass.password);


	if (checkPass.password == password.value) {
		window.location.href = 'flipzon.html';
		console.log("True");
	}

	else {

		var errorMsg = document.getElementById("errorMsg");
		errorMsg.style.removeProperty("display");
		console.log("False");

	}


}
