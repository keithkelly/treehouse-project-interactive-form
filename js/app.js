/**
 * Set variables for needed element
 */
var jobRole = document.getElementById('title');
var nameField = document.getElementById('name');

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
 * Hide fields that should only show when certain options are selected
 */
elementDisplay('hide', 'other-title');