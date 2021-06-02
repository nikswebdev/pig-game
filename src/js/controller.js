import * as model from './model.js';
import * as helpers from './helpers.js';
import {ACTIVITY_INDEX} from './config.js';
import view from './views/view.js';
import View from './views/view.js';
import rollDiceView from './views/rollDiceView.js';
import holdView from './views/holdView.js';
import newGameView from './views/newGameView.js';
import winningView from './views/winningView.js';

const controlRollDice = function(){
    rollDiceView.rollDice(model.storeCurrentScore, model.sendCurrentScore);
}

const controlHold = function(){
    holdView.holdCurrentScore(model.loadTotalScore, model.sendTotalScore);
}

const controlNewGame = function(){
    newGameView.newGame(model.clearScores);
}

const controlCheckWinner = function(){
    winningView.checkForWinner(model.sendWinner);
}


const init = async function(){
    controlRollDice();
    controlHold();
    controlNewGame();
    controlCheckWinner();
}

init();