$(function () {
	console("begin rest");
	// Assign handlers immediately after making the request, and remember the jqxhr object for this request
	// var jsonData = "http://localhost:60526/api/GlossaryMessageViews?ids=x868,x761&?callback=?"
	var jqxhr = $.getJSON("http://localhost:60526/api/GlossaryMessageViews?ids=x868,x761&?callback=?", function (json) {
		console.log("start getJson");
		// console.log("json: " + json);
		// _standings(json.qsbl.standings);
		// _schedule(json.qsbl.schedule);
		// _schedule(json);
	})
	.done(function () { console.log("done"); })
	.fail(function () { console.log("fail"); })
	.always(function () { console.log("always"); });

	// perform other work here ...

	// Set another completion function for the request above
	// jqxhr.complete(function () { console.log("complete"); });
});

function _standings(standings) {
	var items = [];
	$.each(standings, function (key, val) {
		items.push('<tr><td>' + key + '</td><td>' + val.w + '</td><td>' + val.l + '</td><td>' + val.t + '</td><td>' + ((val.w * 2) + (val.t)) + '</td></tr>');
	});

	$('<tbody/>', {
		html: items.join('')
	}).appendTo('#standings');
}

function _schedule(schedule) {
	var items = [];
	var tr;

	var tableHeader = $("<thead><tr><th>Location</th><th>Away</th><th>Home</th></tr></thead>");

	/* key = date, value = location */
	$.each(schedule, function (key, val) {
		items.push('<div data-role=\'collapsible\' data-collapsed=\'false\'>');
		items.push('<h3>' + key + '</h3>');
		items.push('<table>');
		items.push('<thead><tr><th>Location</th><th>Away</th><th>Home</th></tr></thead>');
		items.push('<tbody>');

		/* key = location, value = teams */
		$.each(val, function (key, location) {

			/*
			key = location
			location.away.name, location.away.result
			location.home.name, location.home.result
			*/

			items.push('<tr><td>' + key + '</td><td>' + location.away.name + '</td><td>' + location.away.name + '</td></tr>');

			// items.push('<tr><td>' + key + '</td><td>' + val.w + '</td><td>' + val.l + '</td><td>' + val.t + '</td><td>' + ((val.w * 2) + (val.t)) + '</td></tr>');
		});
		items.push('</tbody>');
		items.push('</table>');
		items.push('</div>');
	});

	$(items.join('')).appendTo($('#schedule'));

	$('#schedule').parent().trigger('create');
}