$(function () {

	$("#button").on('click', function (e) {
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

	var prerequisites = $('ul.prerequisites');
	prerequisites.empty();
	$.each(gradeList, function (i) {
		var text = "";
		switch (gradeList[i].type) {
			case "e":
				text = "English";
				break;
			case "m":
				text = "Mathematice";
				break;
			case "c":
				text = "Chemistry";
				break;
			case "p":
				text = "Physics";
				break;
			case "b":
				text = "Biology";
				break;
			default:
				text = "Unknown";
				break;

		}

		if (gradeList[i].required) {
			var li = $('<li/>')
				 .addClass('mdl-list__item')
				 .appendTo(prerequisites);
			var spanText = $('<span/>')
				 .addClass('mdl-list__item-primary-content')
				 .text(text + ' (' + gradeList[i].value + '%)')
				 .appendTo(li);
			var spanCheck = $('<span/>')
				 .addClass('mdl-list__item-secondary-action')
				.appendTo(li);
			var label = $('<label/>')
				 .addClass('mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect')
				.prop('for', 'list-checkbox-' + i)
				.appendTo(spanCheck);
			var input = $('<input/>')
				.addClass('mdl-checkbox__input')
				.prop('type', 'checkbox')
				.prop('id', 'list-checkbox-' + i)
				.prop('checked', 'checked')
				.appendTo(label);
		}
	});
};