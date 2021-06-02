import View from './view.js';
import {PLAYER_1_INDEX, PLAYER_2_INDEX, CURRENT_SCORE_PLACEHOLDER, NOT_ROLLED} from '../config.js';

class HoldView extends View{
    //set parent element to the 'btn__hold--container' class
_parentElement = document.querySelector('.btn__hold--container');

holdCurrentScore(handleTotal, handleRender){
    this._parentElement.addEventListener('click', function(e){
        e.preventDefault();
        /**
         * The active user must be re-initialized inside of the event listener otherwise the 
            value of _activePlayer will be re-initialized to the value assigned to it 
            in the initial game state game state 
         * 
         */
        this._container = document.getElementById('container');
        this._activePlayer = +this._container.dataset.activeUser;
        /**
         * the 'hasRolled' member keeps track of whether or not the current
           user has rolled their dice after clicking hold. If the user clicks on
           the hold btn wihout first rolling the dice, the active user will stay the
           same. The user must roll their dice in order for the '_switchActivePlayer'
           to be called 
         */
        this.hasRolled = +this._container.dataset.rolledStatus;
        const btn = e.target.closest('.btn__hold');

        if(!btn) return;

        //send score to the model to be stored in the state
        this._sendTotalScore(handleTotal);

        //recieve the score from the state and render it.
        this._renderTotalScore(handleRender);

        /*clear the current score and replace the current score with the default 
          placeholder  
        */
        this._clearCurrentScore();

        //remove the dice from the DOM
        this._clearDice();

        //switch active user
        if(this.hasRolled) {
            this._switchActivePlayer(this._activePlayer)
        };
    }.bind(this));
}

_clearDice(){
    //clear dice from screen
    document.querySelector(`.dice__container--${this._activePlayer}`).innerHTML = '';
}

_clearCurrentScore(){
    //render the placeholder for the current score
    document.querySelector(`.current-score--${this._activePlayer}`).innerHTML = CURRENT_SCORE_PLACEHOLDER;
}


_renderTotalScore(handleRender){
 /**
   handleRender = 'sendTotalScore' function located in the model
   the sendTotalScore function returns the current score of the active user.
 */
    const totalScore = handleRender(this._activePlayer);
    
    //clear the inner html of the container
    document.querySelector(`.totalScore--${this._activePlayer}`).innerHTML = '';

    //render the new total score
    document.querySelector(`.totalScore--${this._activePlayer}`).innerHTML = totalScore;
}

_sendTotalScore(handleTotal){
    /**
     transform the inner html of the text content representing the
     current score - to a number, and send that number to the 'handleTotal' function.
     */
    const currentScore = +document.querySelector(`.current-score--${this._activePlayer}`).innerHTML.trim();
    /**
     * the 'handleTotal' function is the 'loadTotalScore(arg1, arg2)' function located
       in the model. The loadTotalScore(arg1, arg2) function is responsible for storing the 
       total score into the game state.
     */
    handleTotal(this._activePlayer, currentScore);
}

_switchActivePlayer(activePlayer){
    //if player 1
    if(!activePlayer)  {
        //change active user to player 2
        this._container.dataset.activeUser = PLAYER_2_INDEX;
        //change the 'rolled' status to 0(0 = NOT_ROLLED)
        this._container.dataset.rolledStatus = NOT_ROLLED;
        //toggle the active user class for player 2
        this._toggleActiveUserDisplay(PLAYER_2_INDEX);
        //toggle the active user class for player 1
        this._toggleActiveUserDisplay(PLAYER_1_INDEX);
    }else {
        //change active user to player 1
        this._container.dataset.activeUser = PLAYER_1_INDEX;
        //change the 'rolled' status to 0(0 = NOT_ROLLED)
        this._container.dataset.rolledStatus = NOT_ROLLED;
        //toggle the active user class for player 2
        this._toggleActiveUserDisplay(PLAYER_2_INDEX);
        //toggle the active user class for player 1
        this._toggleActiveUserDisplay(PLAYER_1_INDEX);
    };

    
}

_toggleActiveUserDisplay(activePlayer){
    //toggle the '.active' class
    document.querySelector(`.player--${activePlayer}`).classList.toggle('active');
}
}

export default new HoldView();