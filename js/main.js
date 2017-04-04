var _initCalculator = function () {
	$("#button").on('click', function (e) {
		e.preventDefault();
		_calculateAverage($("#inputRange").val().trim());
	});

	$("#switchAll").on('change input', function (e) {
		if ($(this).is(':checked')) {
			$("#inputRange").prop("disabled", true);
			$("#badgeRange").attr("data-badge", '-');
			_calculateAverage(500);
		}
		else {
			$("#inputRange").prop("disabled", false);
			var b = $("#inputRange").val().trim();
			$("#badgeRange").attr("data-badge", b);
			_calculateAverage(b);
		}
	});

	$("#inputRange").on("change input", function () {
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
};

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

var _initGlossaryMsg = function (topN) {

	$('#search').on('keyup click', function () {
		$('table').DataTable().search(
			$('#search').val()
		).draw();
	});

	$('table').DataTable({
		"searchHighlight": true,
		"pageLength": 15,
		"className": 'mdl-data-table__cell--non-numeric',
		"order": [[0, "desc"]],
		"columnDefs": [{ "searchable": false, "targets": 0 }]
	}).on('draw.dt', function () {
		_getOccurrences(topN);
	});
	_getOccurrences(topN);
};

var _getOccurrences = function (topN) {
	var count = 0;
	var totalCount = 0;
	$('#results').empty();

	// here we will store counters for each code
	var occurences = [];

	// iterate each row
	var sum = 0;
	$('table#tab tbody tr').each(function () {

		totalCount += parseInt($(this).children("td:first").text());

		$(this).children("td").not(":first").each(function () {

			// get code in cell
			var code = $(this).text();

			if (code.length) {

				// if that code was counted already then exit
				if (occurences.find(n => n.code === code)) { return; }

				// get occurence count for that code
				var count = parseInt($('table#tab td:contains(' + code + ')').length);

				// find rows with this code in it
				// add the occurrence count  in all the rows
				// add them together to get the match count
				var matchCount = 0;
				var rows = $("table tr:contains(" + code + ")").each(function () {
					matchCount = matchCount + parseInt($(this).children("td:first").text());
				});

				// and store it
				occurences.push({
					code: code,
					count: parseInt(matchCount)
				});
			}
		});
	});

	if (occurences.length === 0) { return };

	// sort in descending order by value
	occurences.sort(function (a, b) { return b.count - a.count; });

	// get topN results
	occurences = occurences.slice(0, topN);

	// for each found code
	var result = "";
	var maxCount = parseFloat(occurences[0].count);
	for (var occurence in occurences) {
		// output to page
		result += occurences[occurence].code + '(<em>' + (occurences[occurence].count / totalCount * 100).toFixed(0) + '%</em>), ';
	}
	// trim trailing comma
	$('#results').html(result.trim().replace(/(^,)|(,$)/g, ""));
};