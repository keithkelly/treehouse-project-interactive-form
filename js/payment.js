/**
 * Set variables for needed element
 */
var paymentOptions = document.getElementById('payment');

/** 
 * ---------------------------------------------------------
 * EVENT LISTENERS
 * ---------------------------------------------------------
 */
paymentOptions.addEventListener('change', function() {
	if(this.value === 'credit card') {
		elementDisplay('show', 'credit-card');
		elementDisplay('hide', 'paypal');
		elementDisplay('hide', 'bitcoin');
	}	
	if(this.value === 'paypal') {
		elementDisplay('hide', 'credit-card');
		elementDisplay('show', 'paypal');
		elementDisplay('hide', 'bitcoin');
	}
	if(this.value === 'bitcoin') {
		elementDisplay('hide', 'credit-card');
		elementDisplay('hide', 'paypal');
		elementDisplay('show', 'bitcoin');
	}
});

/** 
 * ---------------------------------------------------------
 * APP INIT
 * ---------------------------------------------------------
 */

/**
 * Set payment method to credit card
 */
var selectMessage = document.querySelector('option[value="select_method"]');
paymentOptions.removeChild(selectMessage);
paymentOptions.querySelector('option[value="credit card"]').setAttribute('selected', 'true');

/**
 * Hide fields that should only show when certain options are selected
 */
elementDisplay('hide', 'paypal');
elementDisplay('hide', 'bitcoin');