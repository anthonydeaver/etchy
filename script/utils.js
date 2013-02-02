var utils = {		
	/**
	 * Closes a visible popup
	 * @method closePopup
	 */
	closePopup : function(target) {
		var popup = $(target).closest('.popup-box');
		popup.hide();
		$('#overlay').hide();
	},

	/**
	 * Centers a popup vertically and horizontally in the window
	 * @method centerPopup
	 */
	centerPopup : function(popup) {
		var left = ($(window).width() / 2) - ($(popup).width() / 2);
		var top = ($(window).height() / 2) - ($(popup).height() / 2);
	
		$(popup).css('left',left);
		$(popup).css('top',top);
		$(popup).css('z-index','9100');
	},

	/**
	 * Sets up the overlay and displays the requested popup
	 * @method showPopup
	 * @param {String} popup The popup to display
	 * @return none
	 */
	showPopup : function(popup,modal) {
		this.centerPopup(popup);
		if(modal) {
			$('#overlay').css('z-index','9000');
			$('#overlay').css('width',$(window).width());
			$('#overlay').css('height',$(window).height());
			$('#overlay').show();
		}
		$(popup).show();
	},
}