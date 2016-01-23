var samjbrenner = samjbrenner || {};

samjbrenner.boatgame = (function (window, document) {
	var _stage,
		_images = {},
		_imageSourcePrefix,
		_imageSources,
		_currentImgId,
		_boatSpriteSheet,
		_boatAnim,
		_splashSpriteSheet,
		_splashAnim,
		_bgSpriteSheet,
		_bgAnim,
		_fgSpriteSheet,
		_fgAnim,
		_$boatgame,
		_$stageHolder = null;
	
	var _initCanvas = function() {
		_$boatgame = $('#boatgame');
		_stage = new createjs.Stage('boatgame');
		_stage.scaleX = _stage.scaleY = 2;
	};

	var _bindKeyControls = function() {
		$(window).keydown(function(e){
			if(e.which == 32) {
				e.preventDefault();
				_boatAnim.gotoAndPlay('jump');
				_splashAnim.gotoAndPlay('jump');
			}
		});

		$('#boatgame').on('click', function(e) {
			e.preventDefault();
			_boatAnim.gotoAndPlay('jump');
			_splashAnim.gotoAndPlay('jump');
		});
	};

	var _initImages = function() {
		_imageSourcePrefix = '/assets/boatgame/';
		_imageNames = ['boat', 'bg', 'fg', 'splash'];
		_imageSources = ['boat_hr.png', 'bg.jpg', 'fg.jpg', 'splashing.png'];
		
		//begin image load loop
		_currentImgId = 0;
		_loadImage();
	}

	var _loadImage = function() {
		_images[_imageNames[_currentImgId]] = new Image();
		_images[_imageNames[_currentImgId]].onload = _onImgLoad;
		_images[_imageNames[_currentImgId]].onerror = _onImgLoadError;
		_images[_imageNames[_currentImgId]].src = _imageSourcePrefix + _imageSources[_currentImgId];
	};

	var _onTick = function(e) {
		_stage.update();
	};

	var _onImgLoad = function() {
		_currentImgId++;
		
		if(_currentImgId < _imageSources.length) {
			//continue image load loop
			_loadImage();
		} else {
			_onImageLoadLoopComplete();
		}
	};

	var _onImgLoadError = function() {

	};

	var _onImageLoadLoopComplete = function() {
		//boat
		_boatSpriteSheet = new createjs.SpriteSheet({
			images: [_images['boat']],
			frames: {width: 204, height: 184, regX: 0, regY: 0},
			animations: {
				bounce: [0, 1, 'bounce', 15],
				jump: [2, 6, 'bounce', 2]
			}
		});

		_boatAnim = new createjs.BitmapAnimation(_boatSpriteSheet);
		_boatAnim.gotoAndPlay('bounce');
		_boatAnim.currentFrame = 0;
		_boatAnim.scaleX = _boatAnim.scaleY = .5;
		
		_splashSpriteSheet = new createjs.SpriteSheet({
			images: [_images['splash']],
			frames: {width: 102, height: 92, regX: 0, regY: 0},
			animations: {
				bounce: [0, 3, 'bounce', 4],
				jump: [4, 8, 'bounce', 2]
			}
		});

		_splashAnim = new createjs.BitmapAnimation(_splashSpriteSheet);
		_splashAnim.gotoAndPlay('bounce');
		_splashAnim.currentFrame = 0;

		//bg
		_bgSpriteSheet = new createjs.SpriteSheet({
			images: [_images['bg']],
			frames: {width: 150, height:92, regX: 0, regY: 0},
			animations: {
				loop: [0, 9, 'loop', 3]
			}
		});

		_bgAnim = new createjs.BitmapAnimation(_bgSpriteSheet);
		_bgAnim.gotoAndPlay('loop');
		_bgAnim.currentFrame = 0;


		//fg
		_fgSpriteSheet = new createjs.SpriteSheet({
			images: [_images['fg']],
			frames: {width: 150, height:21, regX: 0, regY: 0},
			animations: {
				loop: [0, 1, 'loop', 3]
			}
		});

		_fgAnim = new createjs.BitmapAnimation(_fgSpriteSheet);
		_fgAnim.gotoAndPlay('loop');
		_fgAnim.currentFrame = 0;
		_fgAnim.y = 70;

		//arrange
		_stage.addChild(_bgAnim);
		_stage.addChild(_fgAnim);
		_stage.addChild(_boatAnim);
		_stage.addChild(_splashAnim);

		//kickoff
		createjs.Ticker.addEventListener('tick', _onTick);
	}

	var _bindWindowResize = function() {
		$(window).resize(function() {
			if (!_$stageHolder) {
				_$stageHolder = _$boatgame.parent();
			}

			var w = _$stageHolder.width();
			var h = w * .5625;
			
			_stage.width = w;
			_stage.height = h + 30;
			_$boatgame.css('width', w + 'px');
		}).resize();
	}

	var self = {
		init: function() {
			_initCanvas();
			_initImages();
			_bindKeyControls();
			_bindWindowResize();
		}
	};

	return self;
})(this, this.document);
