$(function () {
	$("#button").click(function (e) {
		e.preventDefault();
		_calculateAverage();
	});
});

var _calculateAverage = function () {
	var input = $("#inputValues").val().trim();
	var grades = input.split(/[\s,-]+/);

	// loop
	var topGrades = [];
	var matureGrades = [];

	for (i = 0; i < grades.length; i++) {
		var grade = parseFloat(grades[i].replace("x", "").replace("X", "").trim());
		topGrades.push(grade);

		/* * * *
		 * 
		 * IE 11 does not suuport str.includes so i'm using str.indexOf
		 * if (grades[i].includes("x") || grades[i].includes("X")) { 
		 * 
		 * * * */
		if (grades[i].indexOf("x") >= 0 || grades[i].indexOf("x") >= 0) {

			// if (grades[i].includes("x") || grades[i].includes("X")) {
			matureGrades.push(grade);
		}
	}

	// sort in descending order
	topGrades.sort(function (a, b) { return b - a });
	matureGrades.sort(function (a, b) { return b - a });


	// var avg = sum / elmt.length;
	// get top 6 grades
	topGrades = topGrades.slice(0, 6);

	var total = 0;
	for (var i = 0; i < topGrades.length; i++) {
		total += topGrades[i];
	}
	var avg = total / topGrades.length;

	$("#outputTopSix").text(avg.toFixed(2));
	$("#outputTopSixValues").text(topGrades);

	total = 0;
	for (var i = 0; i < matureGrades.length; i++) {
		total += matureGrades[i];
	}
	var avg = total / matureGrades.length;

	$("#outputMature").text(avg.toFixed(2));
	if (matureGrades.length > 0) {
		$("#outputMatureValues").text(matureGrades);
	}
	else {
		$("#outputMatureValues").text(Number.NaN);
	}
};