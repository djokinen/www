$(function () {
	$("#button").click(function (e) {
		e.preventDefault();
		_calculateAverage();
	});
});

var _calculateAverage = function () {
	var grade;
	var gradeList = [];
	var isPrerequisite;
	var gradeTypes = ['x', 'e', 'm', 'b', 'p', 'c'];
	var input = $("#inputValues").val().trim();
	var grades = input.split(/[\s,-]+/);

	for (i = 0; i < grades.length; i++) {
		isPrerequisite = false;
		// check if this grade is a prerequisite
		for (var j = 0; j < gradeTypes.length; j++) {
			if (grades[i].indexOf(gradeTypes[j].toLowerCase()) >= 0 || grades[i].indexOf(gradeTypes[j].toUpperCase()) >= 0) {
				isPrerequisite = true;
				var grade = {
					value: parseFloat(grades[i].replace(gradeTypes[j].toLowerCase(), "").replace(gradeTypes[j].toUpperCase(), "").trim()),
					type: gradeTypes[j].toLowerCase(),
					required: true
				};
				break;
			}
		}

		if (!isPrerequisite) {						
			var grade = {
				value: parseFloat(grades[i].trim()),
				type: "a",
				required: false
			};
		}

		gradeList.push(grade);
	}

	// sort in descending order
	gradeList.sort(function (a, b) { return b.value - a.value });

	var total = 0;
	// only use the first 6 grades to get the avg
	var count = (gradeList.length > 6 ? 6 : gradeList.length);
	for (var i = 0; i < count; i++) {
		total += gradeList[i].value;
	}

	var avg = total / count;
	$("#outputTopSix").text(avg.toFixed(2));
	$("#outputTopSixValues").text(gradeList);

	var count = 0
	total = 0;
	for (var i = 0; i < gradeList.length; i++) {
		console.log("required: " + gradeList[i].required);
		if (gradeList[i].required) {
			total += gradeList[i].value;
			count++;
		}
	}
	avg = total / count;

	$("#outputMature").text(avg.toFixed(2));
	if (count == 0) {
		$("#outputMatureValues").text(gradeList);
	}
	else {
		$("#outputMatureValues").text(Number.NaN);
	}

	/* * * * * *
	 *
	 *		Build output display of inputted values 
	 *
	 * * * * * */
};