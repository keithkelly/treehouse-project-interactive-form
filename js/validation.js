(function(){
	'use strict';

	var registrationForm = document.querySelector('form');
	var activitiesElement = document.getElementById('activities');
	var inputName = document.getElementById('name');
	var inputEmail = document.getElementById('mail');
	var inputCreditCard = document.getElementById('cc-num');
	var inputZipCode = document.getElementById('zip');
	var inputCVV = document.getElementById('cvv');
	var paymentSelect = document.getElementById('payment');
	var registrationCheckboxes = document.querySelectorAll('input[type="checkbox"]');
	var submitButton = document.querySelector('button[type="submit"]');

	/** Set variables for error messages */
	var errorName = 'Please enter your name';
	var errorEmail = 'Please enter a valid email address';
	var errorActivities = 'Please choose at least one event to attend';
	var errorCreditCard = 'Please enter a valid credit card number from 13 to 16 numbers';
	var errorZipCode = 'Please enter a valid 5 digit zip code';
	var errorCVV = 'Please enter a valid 3 digit CVV number';

	/**
	 * Check that name field is not blank
	 * @returns {boolean}
	 */
	var checkName = function() {
		return inputName.value.trim().length > 0;
	};

	/**
	 * Check that email address is valid
	 * @returns {boolean}
	 */
	var checkEmail = function() {
		var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
		return emailPattern.test(inputEmail.value);
	};

	 /**
	 * Check that at least one activity has been selected
	 * @returns {boolean}
	 */
	var checkActivities = function() {
		var counter = 0;

		for(var i = 0; i < registrationCheckboxes.length; i++) {
			if(registrationCheckboxes[i].checked) { counter++; }
		}

		return counter > 0;
	};

	/**
	 * Check that the zipcode is 5 numbers
	 * @returns {boolean}
	 */
	var checkCreditNumbers = function(fieldId) {
		var inputValue = document.getElementById(fieldId).value;
		var ccNumPattern = /^[0-9]{13,16}$/;
		var zipCodePattern = /^[0-9]{5}$/;
		var cvvPattern = /^[0-9]{3}$/;

		if(fieldId === 'cc-num') { return ccNumPattern.test(inputValue); }
		if(fieldId === 'zip') { return zipCodePattern.test(inputValue); }
		if(fieldId === 'cvv') { return cvvPattern.test(inputValue); }
	};

	/** Adds or remove error message to the fields label */
	var errorMessage = function(type, checkFunction, errorText, container, element) {
		var attachmentPoint;

		if(type === 'label') { attachmentPoint = element.previousElementSibling; }
		if(type === 'container') { attachmentPoint = document.getElementById(container); }

		var errorMessage = document.createElement('p');
		var getErrorMessage = document.getElementById(element.id + '-error');

		if(!checkFunction) {
			element.classList.add('error');
			errorMessage.id = element.id + '-error';
			errorMessage.classList.add('error');
			errorMessage.innerText = errorText;

			if(!getErrorMessage) {
				if(type === 'label') { attachmentPoint.insertAdjacentElement('afterend', errorMessage); }
				if(type === 'container') { attachmentPoint.insertBefore(errorMessage, attachmentPoint.firstChild); }
			}
		} else {
			element.classList.remove('error');
			if(getErrorMessage) { getErrorMessage.remove(); }
		}
	};

	submitButton.addEventListener('click', function(event) {
		event.preventDefault();
		if(checkName() && checkEmail() && checkActivities()) {
			if(paymentSelect.value === 'credit card') {
				if(checkCreditNumbers('cc-num') && checkCreditNumbers('zip') && checkCreditNumbers('cvv')) { registrationForm.submit(); }
			} else {
				registrationForm.submit();
			}
		} else {
			if(!checkName()) { errorMessage('label', checkName(), errorName, '', inputName); }
			if(!checkEmail()) { errorMessage('label', checkEmail(), errorEmail, '', inputEmail); }
			if(!checkActivities()) { errorMessage('container', checkActivities(), errorActivities, 'activities', activitiesElement); }
			if(paymentSelect.value === 'credit card') {
				if(!checkCreditNumbers('cc-num')) { errorMessage('container', checkCreditNumbers('cc-num'), errorCreditCard, 'credit-card', inputCreditCard); }
				if(!checkCreditNumbers('zip')) { errorMessage('container', checkCreditNumbers('zip'), errorZipCode, 'credit-card', inputZipCode); }
				if(!checkCreditNumbers('cvv')) { errorMessage('container', checkCreditNumbers('cvv'), errorCVV, 'credit-card', inputCVV); }
			}
		}
	});

	inputName.addEventListener('keyup', function() { errorMessage('label', checkName(), errorName, '', inputName); });
	inputEmail.addEventListener('keyup', function() { errorMessage('label', checkEmail(), errorEmail, '', inputEmail); });
	inputCreditCard.addEventListener('keyup', function() { errorMessage('container', checkCreditNumbers('cc-num'), errorCreditCard, 'credit-card', inputCreditCard); });
	inputZipCode.addEventListener('keyup', function() { errorMessage('container', checkCreditNumbers('zip'), errorZipCode, 'credit-card', inputZipCode); });
	inputCVV.addEventListener('keyup', function() { errorMessage('container', checkCreditNumbers('cvv'), errorCVV, 'credit-card', inputCVV); });
})();