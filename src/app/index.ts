
import * as PIXI from "pixi.js"
import { Charm } from 'pixijs-charm';
import {CardsGen} from './modules/cards-gen/cards-gen'; 


// *****************************
let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas"
}

PIXI.utils.sayHello(type)
// *****************************

let Container = PIXI.Container,
    loader = PIXI.Loader,
    resources = PIXI.LoaderResource,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

const app = new PIXI.Application({
    width : 960,
    height : 640,
    transparent : true,
    resolution : window.devicePixelRatio || 1
});
document.body.appendChild(app.view);


const charm = new Charm(PIXI);
const container = new Container();

const mouseposition = app.renderer.plugins.interaction.mouse.global;


//my vars

var holderPos : any[] = [];
const cardsArray = new CardsGen().array;

// разные текстуры
var deckSprite;


PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const scrW = window.screen.width;
const scrH = window.screen.height;


app.renderer.autoDensity = true;
document.body.appendChild(app.view);

app.stage.addChild(container);



// настройка рабочей области
container.width = app.screen.width;
container.height = app.screen.height;

container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;
// app.stop();


PIXI.Loader.shared.add('assets/images/cards-pack.json').load(setup);

var cards : PIXI.Spritesheet | undefined;
var cardsDeckStatic : PIXI.Sprite;
var cardsDeck : PIXI.Sprite;


function setup() {
    // атлас текстур
    cards = PIXI.Loader.shared.resources["assets/images/cards-pack.json"].spritesheet;

    cardsDeckStatic = new Sprite(cards?.textures["deck_3.png"]);
    cardsDeckStatic.pivot.set(0.5);
    cardsDeckStatic.anchor.set(0.5);
    cardsDeckStatic.scale.set(0.25);
    cardsDeckStatic.interactive = true;
    cardsDeckStatic.buttonMode = true;
    cardsDeckStatic.on('click', onClick);
    cardsDeckStatic.x = app.screen.width / 2;
    cardsDeckStatic.y = app.screen.height - (app.screen.height / 5);
    container.addChild(cardsDeckStatic);


    cardsDeck = new Sprite(cards?.textures["deck_3.png"]);
    cardsDeck.pivot.set(0.5);
    cardsDeck.anchor.set(0.5);
    cardsDeck.scale.set(0.25);
    cardsDeck.interactive = true;
    cardsDeck.buttonMode = true;
    cardsDeck.on('click', onClick);
    cardsDeck.x = app.screen.width / 2;
    cardsDeck.y = app.screen.height - (app.screen.height / 5);
    container.addChild(cardsDeck);
    
    // спрайт рубашки карты
    deckSprite = new Sprite(cards?.textures["deck_3.png"]);
    // задаю путь к текстуре спрайта и добавляю в массив сгенерированной колоды карт
    for (let key in cardsArray) {
        // cardsArray[key].sprite = `card_b_${cardsArray[key].code}.png`;
        cardsArray[key].sprite = new Sprite(cards?.textures[`card_b_${cardsArray[key].code}.png`])
        // console.log(cardsArray.array[key].sprite);
    }
    // console.log(cardsArray);
    // предполагаемое место для расположении карт по масти (4 ячейки)
    for (var index = 1; index < 5; index++) {
        let emptyCardPlace = new Sprite(cards?.textures["card_selected_large.png"]);
        emptyCardPlace.scale.set(0.25, 0.25);
        emptyCardPlace.pivot.set(0.5);
        emptyCardPlace.anchor.set(0.5);
        // emptyCardPlace.x = (emptyCardPlace.width * 1.4) * (index - 2 );
        emptyCardPlace.x = (index * emptyCardPlace.width * 1.2) + app.screen.width / 6;
        console.log(emptyCardPlace.x, emptyCardPlace.y);
        emptyCardPlace.y = app.screen.height / 8;
        container.addChild(emptyCardPlace);
        holderPos.push({
            x: emptyCardPlace.x,
            y: emptyCardPlace.y
        });

    }
}



const delay = 5000;
var openState : boolean = false;


function onClick() {
    var picked : any;
    

    var deckpos = {
        x: app.screen.width / 2,
        y: app.screen.height * 0.8
    };

    if (cardsArray.length == 1) {
        // console.log("массив пустой");
        // container.removeChild(cardsDeck);
        // container.removeChild(cardsDeckStatic);
        cardsDeckStatic.x += deckpos.x;
        cardsDeckStatic.y += deckpos.y;
    }

    if (!openState) {
    openState=true;
    picked = cardsArray.pop();
    const opened = picked.sprite;
    console.log(cardsArray.length);
    opened.x = app.screen.width / 2;
    opened.y = app.screen.height / 2;
    opened.pivot.set(0.5, 0.5);
    opened.anchor.set(0.5, 0.5);
    opened.scale.set(0.75);
    setTimeout(function () {
        if (cardsDeck && cardsArray.length > 0) {
            // let slideTween = charm.slideScaleDouble(cardsDeck, opened, app.screen.width / 2, app.screen.height / 2, 0.45, 0.45, 2, 2, delay * 1.5);
            let slideTween = charm.slide(cardsDeck, app.screen.width / 2, app.screen.height / 2, delay * 1.5);
            //charm.scale(cardsDeck, 0, cardsDeck.height, 4000);
            slideTween.onCompleted = () => {
                if (cardsArray.length == 1) {
                    cardsDeck.x += deckpos.x;
                    cardsDeck.y += deckpos.y;
                    
                } else {
                    cardsDeck.x = deckpos.x;
                    cardsDeck.y = deckpos.y;
                    cardsDeck.scale.set(0.25);
                    // cardsDeck.width = cardDeckSize.x;
                    // cardsDeck.height = cardDeckSize.y;
                    // cardsDeck = PIXI.Sprite.from('img/deck.png');
                    container.addChild(opened);
                    setTimeout(function () {
                        // let secondStep = charm.slideScale(opened, holderPos[picked.type].x, holderPos[picked.type].y, 0.75, 0.75, delay);
                        let secondStep = charm.slide(opened, holderPos[picked.type].x, holderPos[picked.type].y, delay);
                        secondStep.onCompleted = () => {
                            // имитация цикличного авторазложения карт по масти с анимацией
                            // setTimeout(onClick(), 0);
                            setTimeout(function() {
                                openState=false;
                                onClick();
                            }, 500);
                        };
                    }, 500);
                }


            };
        } else {
            cardsDeck.x += deckpos.x;
            cardsDeck.y += deckpos.y;
            
            container.removeChild(cardsDeck);
        }
    }, 200);
    }

}


function gameLoop() {
    requestAnimationFrame(gameLoop);
    charm.update();
}

app.ticker.add((delta) => {
    if (cardsArray.length == 1 && cardsDeckStatic && cardsDeck) {
        container.removeChild(cardsDeck);
        container.removeChild(cardsDeckStatic);
        console.log("массив пустой");
        // cardsDeck = null;
        // cardsDeckStatic = null;
    }
    gameLoop();
});