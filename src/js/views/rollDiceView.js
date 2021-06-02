import View from './view.js';
import {DICE_MAX, ACTIVITY_INDEX, PLAYER_1_INDEX, PLAYER_2_INDEX, CURRENT_SCORE_PLACEHOLDER, ROLLED, NOT_ROLLED} from '../config.js';

import dice1 from 'url:../../img/dice-1.png';
import dice2 from 'url:../../img/dice-2.png';
import dice3 from 'url:../../img/dice-3.png';
import dice4 from 'url:../../img/dice-4.png';
import dice5 from 'url:../../img/dice-5.png';
import dice6 from 'url:../../img/dice-6.png';

class RollDice extends View{

_btnParentElement = document.querySelector('.btn__roll-dice--container');


rollDice(handlerLoadData, handlerRenderScore){
    
    //user clicks on the button element containing the 'btn__roll-dice' class
    this._btnParentElement.addEventListener('click', function(e){

        this._container = document.getElementById('container');
        
        this._container.dataset.rolledStatus = ROLLED;

        this._activePlayer = +this._container.dataset.activeUser;
        this._parentElement = document.querySelector(`.dice__container--${this._activePlayer}`);
        this._diceImgPath = [dice1, dice2, dice3, dice4, dice5, dice6];
        this._currentScoreText = document.querySelector(`.current-score--${this._activePlayer}`).innerHTML.trim(); 
        this._totalScoreText = document.querySelector(`.totalScore--${this._activePlayer}`).innerHTML.trim(); 

        //generate a random number between 1 - 6
        const randomNumber = this._generateRandomNumber();
        e.preventDefault();

        /*use the parent element of the 'roll dice' btn to find
          the target when the target is the roll dice button element
        */
        const btn = e.target.closest('.btn__roll-dice');
        
        //safe guard
        if(!btn) return;

        //render the updated dice image
        this._renderNewRoll(randomNumber);

        /*
        send the updated current scores to the model.state
        object via controller.js
        */

        //if randomNumber = 1, set current score to 0
        this._getCurrentScore(handlerLoadData, randomNumber);
        this._renderCurrentScore(handlerRenderScore);
        
        //if roll = 0, then switch the active player and set the current score to 0
        //  ...and trigger a hold btn trigger event
        if(randomNumber === 1){
            this._holdClickEvent();
            this._renderNewRoll(randomNumber);
        }

    }.bind(this))
}

_holdClickEvent(){
        document.querySelector('.btn__hold').click();
    
}


_renderCurrentScore(handlerRenderScore){
    document.querySelector(`.current-score--${this._activePlayer}`).innerHTML = '';
    document.querySelector(`.current-score--${this._activePlayer}`).innerHTML = handlerRenderScore(this._activePlayer);
}

_getCurrentScore(handlerLoadData, randomNumb){handlerLoadData(this._activePlayer, randomNumb);}

_generateRandomNumber(){
    return Math.ceil(Math.random() * DICE_MAX);
}

_generateMarkup(randomNumb){
    return `
    <img src="${this._diceImgPath[randomNumb - 1]}" alt="dice" class="dice dice--${this._activePlayer}">
    `;
}

_renderNewRoll(randomNumb){
    const markup = this._generateMarkup(randomNumb);
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
}


}

export default new RollDice();

