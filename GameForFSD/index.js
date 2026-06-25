let mat = [
	[1, 2, 3, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 0, 0, 0, 0, 0, 0]
];

let prevCell = null;


const sudoku = document.getElementById("sudoku");

let tableHtml = "";

mat.forEach((ele, index) => {
	tableHtml += `<tr>`;

	ele.forEach((e, i) => {
		if (e == 0) tableHtml += `<td id='${index}_${i}' class="unactive" onClick='clicked(this, ${index}, ${i})'></td>`
		else tableHtml += `<td class="unactive"> ${e} </td>`;
	});
});

sudoku.innerHTML = tableHtml;


function clicked(e, row, col) {
	if (prevCell) {
		prevCell.classList.remove("active");
		prevCell.classList.add("unactive");
	}

	prevCell = e;
	e.classList.remove("unactive");
	e.classList.add("active");
	console.log("clicked")

	e.innerText = 10;
	console.log(e)
}
