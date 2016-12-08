$(function () {
	$("#button").click(function (e) {
		e.preventDefault();
		_calculateAverage();
	});
});

var _calculateAverage = function () {
	var gradePrefixes = ['x', 'e', 'm', 'b', 'p', 'c'];
	var input = $("#inputValues").val().trim();
	var grades = input.split(/[\s,-]+/);

	// loop
	var topGrades = [];
	var matureGrades = [];
	var grade; //var grade = {value:85.2, type:"m", required:true};
	var gradeList = [];
	for (i = 0; i < grades.length; i++) {
		grade = null;
		for (var j = 0; j < gradePrefixes.length; j++) {
			if (grades[i].indexOf(gradePrefixes[j].toLowerCase()) >= 0 || grades[i].indexOf(gradePrefixes[j].toUpperCase()) >= 0) {
				grade = {
					value: parseFloat(grades[i].replace(gradePrefixes[j].toLowerCase(), "").replace(gradePrefixes[j].toUpperCase(), "").trim()),
					type: gradePrefixes[j].toLowerCase(),
					required: true
				};
				matureGrades.push(grade);
			}
		}

		if (grade == null) {
			grade = {
				value: parseFloat(grades[i].trim()),
				type: "a",
				required: false
			};
		}

		topGrades.push(grade.value);
		gradeList.push(grade);

		//// get the grade value of this item. remove the ammended letter if present
		//var grade = parseFloat(
		//	grades[i]
		//	.replace(gradePrefixes[0].toLowerCase(), "").replace(gradePrefixes[0].toUpperCase(), "")
		//	.replace(gradePrefixes[1].toLowerCase(), "").replace(gradePrefixes[1].toUpperCase(), "")
		//	.replace(gradePrefixes[2].toLowerCase(), "").replace(gradePrefixes[2].toUpperCase(), "")
		//	.replace(gradePrefixes[3].toLowerCase(), "").replace(gradePrefixes[3].toUpperCase(), "")
		//	.replace(gradePrefixes[4].toLowerCase(), "").replace(gradePrefixes[4].toUpperCase(), "")
		//	.replace(gradePrefixes[5].toLowerCase(), "").replace(gradePrefixes[5].toUpperCase(), "")
		//	.trim());

		//topGrades.push(grade);

		/* * * *
		 * 
		 * IE 11 does not suuport str.includes so i'm using str.indexOf
		 * if (grades[i].includes("x") || grades[i].includes("X")) { 
		 * 
		 * * * */
		//for (var j = 0; j < gradePrefixes.length; j++) {
		//	if (grades[i].indexOf(gradePrefixes[j].toLowerCase()) >= 0 || grades[i].indexOf(gradePrefixes[j].toUpperCase()) >= 0) {
		//		matureGrades.push(grade);
		//	}
		//}

		// if (grades[i].indexOf("x") >= 0 || grades[i].indexOf("x") >= 0) { matureGrades.push(grade); }
	}

	// sort in descending order
	topGrades.sort(function (a, b) { return b.grade - a.grade });

	matureGrades.sort(function (a, b) { return b.grade - a.grade });

	// var avg = sum / elmt.length;
	// get top 6 grades
	topGrades = topGrades.slice(0, 6);

	var total = 0;
	for (var i = 0; i < topGrades.length; i++) {
		total += topGrades[i].grade;
	}
	var avg = total / topGrades.length;

	$("#outputTopSix").text(avg.toFixed(2));
	$("#outputTopSixValues").text(topGrades);

	total = 0;
	for (var i = 0; i < matureGrades.length; i++) {
		total += matureGrades[i].grade;
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