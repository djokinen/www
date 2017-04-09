$(function () {
	_getMessages("x868,x761");
});

// HELP: https://docs.microsoft.com/en-us/aspnet/web-api/overview/security/enabling-cross-origin-requests-in-web-api
var _getMessages = function (ids) {

	var surl = "http://localhost:60526/api/GlossaryMessageViews?ids=" + ids;

	var jqxhr = $.getJSON(surl, function (data) {
		console.log("getJson");
		var items = [];
		$.each(data, function (key, val) {
			console.log("Item #: " + key +
				"\nID: " + val.Id +
				"\nDesc: " + val.Description +
				"\nText: " + val.Text +
				"\nID: " + val.Id + "\n\n");
			items.push("<li id='" + key + "'>" + val.Id + "</li>");
		});

		$("<ul/>", {
			"class": "my-new-list",
			html: items.join("")
		}).appendTo("#test");

	}).done(function (json) { console.log("done"); })
	.fail(function (json) { console.log("fail"); })
	.always(function (json) { console.log("always"); });
};

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