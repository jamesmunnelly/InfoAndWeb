var selectedTab;

$(document).ready(function() {

	// ----- EXCHANGED FOR JS, PLEASE CHECK! -----
	//$('.menuChild').hide();
	//$('.item').mouseover(function() {
		//$(this).children('.menuChild').show();
	//});
	//$('.item').mouseout(function() {
		//$(this).children('.menuChild').hide();
	//});
	linkLinks();
	showPage($('#link0'));
});

function initialise() {

	initMenu();

}


function linkLinks() {
	$('.link').mousedown(function() {
		showPage(this);
	});
}

/**
 * Shows the page content for the specified link (loading via AJAX)
 * Note: if the corresponding content does not exist, the page will not update!
 * @param  {Object} link The links DOM element
 */
function showPage(link) {
	$(selectedTab).removeClass('selected');
	$(link).addClass('selected');
	selectedTab = link;

	pageName = $(link).html();

	requestData("./pages/" + pageName.replace(/ /g, '') + ".html", function(requestObject) {
		$('#pageTitle').html(pageName);
		$('#content').html(requestObject.responseText);
		linkLinks();
	});
}


// ----- NEW JS MENUS -----
// Sets the menus to how the should be on page load.
function initMenu() {

  // Getting the nav and all the items/menus in it.
  var items = document.getElementsByClassName("item");
  var links = document.getElementsByClassName("menuChild");

  // Adding mouse events to all the menus.
  for(var i = 0; i < items.length; i++) {
  
 	attachMenuMouseEvents(items[i]);
  
  }

  // Hiding all menu links.
  for(var i = 0; i < links.length; i++) {
  
 	links[i].style.display = "none";
  
  }

}

// Adds mouse events to a menu to toggle the sub-menu.
function attachMenuMouseEvents(menu) {

	// Adding mouse events to toggle visibility on mouse over/out.
	menu.onmouseover = function() {toggleSubMenu(this);};
	menu.onmouseout = function() {toggleSubMenu(this);};

}

// Takes a menu and toggles visibility of its sub-menu.
function toggleSubMenu(menu) {

	var children = menu.getElementsByClassName("menuChild");

	// Iterating over all menu links and toggling them.
	for(var i = 0; i < children.length; i++) {

		var menuItem = children[i];
	
		if(menuItem.style.display == "block") {
		
			menuItem.style.display = "none";
		
		} else {
		
			menuItem.style.display = "block";
		
		}
	
	}

}

// Reimplementing method to work in old browsers.
function getElementsByClassName(className) {

	// Getting all elements in the given DOM object.
	var elements = this.getElementsByTagName("*");

	// Creating an array to store objects with valid class.
	var validElements = new Array();
	
	// Iterating over all elements to check class name.
	for(var i = 0; i < elements.length; i++) {
	
		var element = elements[i];

		if(element.className == className) {
		
			// Adding the element if the class is correct.
			validElements.push(element);	

		}
	
	}

	return validElements;

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
