var totalCost = 0;

// Set variables for needed element
var colorOptions = document.getElementById('color');
var jobRole = document.getElementById('title');
var nameField = document.getElementById('name');
var themeOptions = document.getElementById('design');
var registrationCheckboxes = document.querySelectorAll('input[type="checkbox"]');

/** @function
 * Create the total cost container and append it to the activities fieldset
 */
var addTotalCost = function() {
	var activitiesContainer = document.querySelector('.activities');
	var createTotalCostContainer = document.createElement('div');

	createTotalCostContainer.id = 'total-cost';
	createTotalCostContainer.innerText = 'Total Cost: $' + totalCost;
	activitiesContainer.append(createTotalCostContainer);
}

/** @function
 * Update the total cost container text with the new totalCost
 */
var updateTotalCost = function() {
	var totalCostContainer = document.getElementById('total-cost');
	totalCostContainer.innerText = 'Total Cost: $' + totalCost;
}

/** @function
 * Get the cost of an event from the event description string
 * @param {string} eventString 
 * 		The string of text with all of the event details
 * @returns {string} 
 * 		Portion of eventString that conatains the cost of the event
 */
var getEventCost = function(eventString) {
	var start = eventString.indexOf('$') + 1;
	var cost = parseInt(eventString.substring(start), 10);
	return cost;
}

/** @function
 * Get the name of an event from the event description string
 * @param {string} eventString 
 * 		The string of text with all of the event details
 * @returns {string} 
 * 		Portion of eventString that conatains the name of the event
 */
var getEventName = function(eventString) {
	var end = eventString.indexOf('\u2014') - 1;
	return eventString.substring(0, end);
}

/** @function
 * Get the time of an event from the event description string
 * @param {string} eventString 
 * 		The string of text with all of the event details
 * @returns {string} 
 * 		Portion of eventString that conatains the date and time of the event
 */
var getEventTime = function(eventString) {
	var start = eventString.indexOf('\u2014') + 2;
	var end = eventString.indexOf(',');
	return eventString.substring(start, end);
}

/** @function
 * Disbale checkboxes of events that conflict with the currently selected event and update totalCost
 * @param {boolean} checkedState
 * 		The current checked state of the checkbox
 * @param {string} 	eventString 
 * 		The string of text with all of the event details
 */
var eventStatusToggle = function(checkedState, eventString) {
	var selectedEventCost = getEventCost(eventString);
	var selectedEventName = getEventName(eventString);
	var selectedEventTime = getEventTime(eventString);

	// Disable / re-enable conflicting events depending on checkedState of the event
	for(var i = 0; i < registrationCheckboxes.length; i++) {
		var currentEventString = registrationCheckboxes[i].parentElement.innerText;
		var currentEventName = getEventName(currentEventString);
		var currentEventTime = getEventTime(currentEventString);

		if(currentEventName !== selectedEventName && currentEventTime === selectedEventTime) {
			if(checkedState) {
				registrationCheckboxes[i].disabled = true;
				registrationCheckboxes[i].parentElement.style.color = '#777';
			} else {
				registrationCheckboxes[i].disabled = false;
				registrationCheckboxes[i].parentElement.style.color = '';
			}
		}
	}

	// Update the total event cost
	if(checkedState) {
		totalCost += selectedEventCost;
	} else {
		totalCost -= selectedEventCost;
	}
}

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

// Show text field for description of a job role when the 'other' option is selected from the job role select
// If other options are selected make sure the field is hidden
jobRole.addEventListener('change', function() {
	if(this.value === 'other') {
		elementDisplay('show', 'other-title');
	} else {
		elementDisplay('hide', 'other-title');
	}
});

// When the value of the theme options select changes update the color options
themeOptions.addEventListener('change', updateColorOptions);

// Add event listeners to checkboxes
for(var i = 0; i < registrationCheckboxes.length; i++) {
	registrationCheckboxes[i].addEventListener('change', function() {
		var eventString = this.parentElement.innerText;
		var totalCostContainer = document.getElementById('total-cost');

		eventStatusToggle(this.checked, eventString);

		if(totalCost > 0 && !totalCostContainer) {
			addTotalCost();
		} else if(totalCost > 0 && totalCostContainer) {
			updateTotalCost();
		} else {
			totalCostContainer.innerText = '';
		}
	})
}

// Initial app setup
// Autofocus on the name field
nameField.setAttribute('autofocus', 'true');
// Replace the theme color options
colorOptions.innerHTML = '<option value="message">Please choose a design to see color options.</option>';

// Hide fields that should only show when certain options are selected
elementDisplay('hide', 'other-title');
elementDisplay('hide', 'credit-card');