/**
 * Set initial variables
 */
var totalCost = 0;

/**
 * Set variables for needed element
 */
 var registrationCheckboxes = document.querySelectorAll('input[type="checkbox"]');


 /** 
 * ---------------------------------------------------------
 * FUNCTIONS
 * ---------------------------------------------------------
 */

/** @function
 * Create the total cost container and append it to the activities fieldset
 */
var addTotalCost = function() {
	var activitiesContainer = document.querySelector('.activities');
	var createTotalCostContainer = document.createElement('div');

	createTotalCostContainer.id = 'total-cost';
	createTotalCostContainer.innerText = 'Total: $' + totalCost;
	activitiesContainer.append(createTotalCostContainer);
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
 * Update the total cost container text with the new totalCost
 */
var updateTotalCost = function() {
	var totalCostContainer = document.getElementById('total-cost');
	totalCostContainer.innerText = 'Total: $' + totalCost;
}


/** 
 * ---------------------------------------------------------
 * EVENT LISTENERS
 * ---------------------------------------------------------
 */

/**
 * Add event listeners to checkboxes
 */
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
	});
}