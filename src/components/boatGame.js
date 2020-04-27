import React from 'react';
import * as createjs from 'createjs-module';

export default class BoatGame extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
  }

  async componentDidMount() {
    this.stage = new createjs.Stage('boatgame');

    await this.initImages();
    this.createSpriteSheets();

    createjs.Ticker.addEventListener('tick', () => {
      this.stage.update();
    });

    setInterval(() => this.jump(), 10000);
  }

  initImages() {
    this.images = {};

    const imageSourcePrefix = '/img/boatgame/';

    const images = [{
      id: 'boat',
      src: 'boat.png'
    }, {
      id: 'bg',
      src: 'bg.jpg'
    }, {
      id: 'fg',
      src: 'fg.jpg'
    }, {
      id: 'splash',
      src: 'splashing.png'
    }];

    return Promise.all(images.map(i => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = imageSourcePrefix + i.src;

        this.images[i.id] = image;
      });
    }));
  }

  createSpriteSheets() {
    //boat
		this.boatSpriteSheet = new createjs.SpriteSheet({
			images: [this.images['boat']],
			frames: {width: 102, height: 92, regX: 0, regY: 0},
			animations: {
				bounce: [0, 1, 'bounce', 0.1],
				jump: [2, 6, 'bounce', 0.6]
			}
		});

		this.boatAnim = new createjs.Sprite(this.boatSpriteSheet);
		this.boatAnim.gotoAndPlay('bounce');
		this.boatAnim.currentFrame = 0;

		this.splashSpriteSheet = new createjs.SpriteSheet({
			images: [this.images['splash']],
			frames: {width: 102, height: 92, regX: 0, regY: 0},
			animations: {
				bounce: [0, 3, 'bounce', 0.2],
				jump: [4, 8, 'bounce', 0.6]
			}
		});

		this.splashAnim = new createjs.Sprite(this.splashSpriteSheet);
		this.splashAnim.gotoAndPlay('bounce');
		this.splashAnim.currentFrame = 0;

		//bg
		this.bgSpriteSheet = new createjs.SpriteSheet({
			images: [this.images['bg']],
			frames: {width: 150, height:92, regX: 0, regY: 0},
			animations: {
				loop: [0, 9, 'loop', 0.3]
			}
		});

		this.bgAnim = new createjs.Sprite(this.bgSpriteSheet);
		this.bgAnim.gotoAndPlay('loop');
		this.bgAnim.currentFrame = 0;

		//fg
		this.fgSpriteSheet = new createjs.SpriteSheet({
			images: [this.images['fg']],
			frames: {width: 150, height:21, regX: 0, regY: 0},
			animations: {
				loop: [0, 1, 'loop', 0.3]
			}
		});

		this.fgAnim = new createjs.Sprite(this.fgSpriteSheet);
		this.fgAnim.gotoAndPlay('loop');
		this.fgAnim.currentFrame = 0;
		this.fgAnim.y = 70;

		//arrange
		this.stage.addChild(this.bgAnim);
		this.stage.addChild(this.fgAnim);
		this.stage.addChild(this.boatAnim);
		this.stage.addChild(this.splashAnim);
  }

  onMouseDown() {
    this.jump();
  }

  jump() {
    this.boatAnim.gotoAndPlay('jump');
    this.splashAnim.gotoAndPlay('jump');
  }

  render() {
    return (
      <canvas onMouseDown={this.onMouseDown} width="150" height="92" id="boatgame"></canvas>
    );
  }
}
