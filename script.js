var selectedTab;

$(document).ready(function() {
	$('.menuChild').hide();
	$('.item').mouseover(function() {
		$(this).children('.menuChild').show();
	});
	$('.item').mouseout(function() {
		$(this).children('.menuChild').hide();
	});
	$('.link').mousedown(function() {
		showPage(this);
	});
	showPage($('#link0'));
});

/**
 * Shows the page content for the specified link (loading via AJAX)
 * Note: if the corresponding content does not exist, the page will not update!
 * @param  {Object} link The links DOM element
 */
function showPage(link) {
	$(selectedTab).removeClass('selected');
	$(link).addClass('selected');
	$(link).parent().children('.menuChild').show();
	selectedTab = link;

	pageName = $(link).html();

	requestData("./pages/" + pageName.replace(/ /g, '') + ".html", function(requestObject) {
		$('#pageTitle').html(pageName);
		$('#content').html(requestObject.responseText);
	});
}

/* function taken from assm3 */
function requestData(url, callBack)
{
	// Create a new XMLHttpRequest object
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// XMLHttpRequest is supported
		xmlhttp = new XMLHttpRequest();
	}
	else {
		// Create an ActiveX Object
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			callBack(xmlhttp);
		}
	}
	// Open the object with the filename
	xmlhttp.open("POST", url, true);
	// Send the request
	xmlhttp.send(null);
}
