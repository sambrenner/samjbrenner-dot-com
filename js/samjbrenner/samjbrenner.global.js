var samjbrenner = samjbrenner || {};

samjbrenner.global = (function(window, document) {
	var _alignPortfolioPieces = function() {
		var $previousElement;
		var previousHeight;
		
		$('.portfolio').each(function(i) {
			var $this = $(this).css('height', 'auto');
			
			if (!(i % 2)) {
				// left hand column
				$previousElement = $this;
				previousHeight = $this.height();
			} else {
				// right hand column
				var currentHeight = $this.height();
				var setHeight = 600;
				
				if (currentHeight > previousHeight) {
					setHeight = currentHeight;
				} else {
					setHeight = previousHeight;
				}

				$previousElement.css('height', setHeight + 'px');
				$this.css('height', setHeight + 'px');
			}
		});
	};		

	var self = {
		init: function() {
			_alignPortfolioPieces();
		}
	}

	return self;
})(this, this.document);

$(document).ready(function() {
	samjbrenner.global.init();
	samjbrenner.boatgame.init();
});
