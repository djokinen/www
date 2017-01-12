$(function () {

	$("#button").on('click', function (e) {
		e.preventDefault();
		_calculateAverage($("#inputRange").val().trim());
	});

	$("#inputRange").change(function () {
		var b = $("#inputRange").val().trim();
		$("#badgeRange").attr("data-badge", b);
		_calculateAverage(b);
	});

	$(':reset').click(function () {
		$('ul.prerequisites').empty();
		$('#outputTopSix').text("-");
		$('#outputMature').text("-");
		$('#badgeRange').attr("data-badge", 6);
		$('#inputRange').val(6);
	});
});

var _calculateAverage = function (topN) {
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
				grade = {
					value: parseFloat(grades[i].replace(gradeTypes[j].toLowerCase(), "").replace(gradeTypes[j].toUpperCase(), "").trim()),
					type: gradeTypes[j].toLowerCase(),
					required: true
				};
				break;
			}
		}

		if (!isPrerequisite) {
			grade = {
				value: parseFloat(grades[i].trim()),
				type: "a",
				required: false
			};
		}

		gradeList.push(grade);
	}

	// sort in descending order by value
	gradeList.sort(function (a, b) { return b.value - a.value; });

	var i;
	var total = 0;
	// var inputRange = $("#inputRange").val().trim();
	// only use the first 6 grades to get the avg
	// var count = gradeList.length > 6 ? 6 : gradeList.length;
	var count = gradeList.length > topN ? topN : gradeList.length;
	for (i = 0; i < count; i++) {
		total += gradeList[i].value;
	}

	var avg = total / count;
	$("#outputTopSix").text(avg.toFixed(2));
	$("#outputTopSixValues").text(gradeList);

	count = 0;
	total = 0;
	for (i = 0; i < gradeList.length; i++) {
		if (gradeList[i].required) {
			total += gradeList[i].value;
			count++;
		}
	}
	avg = total / count;

	$("#outputMature").text(avg.toFixed(2));
	if (count === 0) {
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

	// sort in ascending order by type
	gradeList.sort(function (a, b) { return a.type - b.type; });

	var prerequisites = $('ul.prerequisites');
	prerequisites.empty();
	$.each(gradeList, function (i) {
		var text = "";
		switch (gradeList[i].type) {
			case "e":
				text = "English";
				break;
			case "m":
				text = "Mathematic";
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
			componentHandler.upgradeDom();
		}
	});
};