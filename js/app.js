/**
 * Set variables for needed element
 */
var colorOptions = document.getElementById('color');
var jobRole = document.getElementById('title');
var nameField = document.getElementById('name');
var themeOptions = document.getElementById('design');

/** 
 * ---------------------------------------------------------
 * FUNCTIONS
 * ---------------------------------------------------------
 */

/** @function
 * Show or hide a particular element based on an id provided
 * @param {string} type 		
 * 		The options either 'show' or 'hide' the selected element
 * @param {string} fieldId 	
 * 		The id attribute of the element that is to be removed
 */
var elementDisplay = function(type, elementId) {
	var element = document.getElementById(elementId);
	if(type === 'show') {
		element.style.display = 'block';
	}
	if(type === 'hide') {
		element.style.display = 'none';
	}
}

/** @function
 * Show proper options when a user selects their shirt theme 
 */
var updateColorOptions = function() {
	var options;
	if(this.value === 'js puns') {
		options += '<option value="cornflowerblue">Cornflower Blue</option>';
		options += '<option value="darkslategrey">Dark Slate Grey</option>';
		options += '<option value="gold">Gold</option>';
		colorOptions.innerHTML = options;
	}
	if(this.value === 'heart js') {
		options += '<option value="tomato">Tomato</option>';
		options += '<option value="steelblue">Steel Blue</option>';
		options += '<option value="dimgrey">Dim Grey</option>';
		colorOptions.innerHTML = options;
	}
}

/** 
 * ---------------------------------------------------------
 * EVENT LISTENERS
 * ---------------------------------------------------------
 */

/** @function
 * Show text field for description of a job role when the 'other' option is selected from the job role select
 * If other options are selected make sure the field is hidden
 */
jobRole.addEventListener('change', function() {
	if(this.value === 'other') {
		elementDisplay('show', 'other-title');
	} else {
		elementDisplay('hide', 'other-title');
	}
});

/** @function
 * When the value of the theme options select changes update the color options
 */
themeOptions.addEventListener('change', updateColorOptions);



/** 
 * ---------------------------------------------------------
 * APP INIT
 * ---------------------------------------------------------
 */

/**
 * Autofocus on the name field
 */
nameField.setAttribute('autofocus', 'true');

/**
 * Replace the theme color options
 */
colorOptions.innerHTML = '<option value="message">Please choose a design to see color options.</option>';

/**
 * Hide fields that should only show when certain options are selected
 */
elementDisplay('hide', 'other-title');