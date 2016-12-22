/**
 * Set variables for needed element
 */
var colorOptions = document.getElementById('color');
var themeOptions = document.getElementById('design');


/** 
 * ---------------------------------------------------------
 * FUNCTIONS
 * ---------------------------------------------------------
 */

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
 * When the value of the theme options select changes update the color options
 */
themeOptions.addEventListener('change', updateColorOptions);
themeOptions.addEventListener('change', function() {
	if(this.value === 'js puns' || this.value === 'heart js') {
		elementDisplay('show', 'colors-js-puns');
	} else {
		elementDisplay('hide', 'colors-js-puns');
	}
});


/** 
 * ---------------------------------------------------------
 * APP INIT
 * ---------------------------------------------------------
 */

 /**
 * Hide fields that should only show when certain options are selected
 */
elementDisplay('hide', 'colors-js-puns');

/**
 * Replace the theme color options
 */
// colorOptions.innerHTML = '<option value="message">Please choose a design to see color options.</option>';