import {MAX_SCORE, PLAYER_1_INDEX, PLAYER_2_INDEX} from '../config.js';
import View from './view.js';


class WinningView extends View{
    _parentElement = document.querySelector('.btn__hold--container');

    checkForWinner(handler){
        this._parentElement.addEventListener('click', function(e){
        
        //retrive total scores
        this._winner = this._retrieveWinner(handler); 
        
        if(this._winner === PLAYER_1_INDEX || this._winner === PLAYER_2_INDEX)
        {   /**
             reset game by creating a click event on the new-game button. 
             See details in newGameView.js
            */
            this._newGameClickEvent();

            //display winning message
            this._displayWinnerMessage(this._winner);

            //if user clicks the play-again btn
            this._playAgain();

            //if user clicks the quit btn
            this._quitGame();
        }else return;

        }.bind(this))
    }

    _retrieveWinner(handler){
        return handler();
    }

    _newGameClickEvent(){
        document.querySelector('.btn__new-game').click();
    }

    _displayWinnerMessage(winningPlayer){
        document.querySelector('.game-container').classList.add('winner-message');
        document.querySelector('.message__container').classList.remove('hide-message');
        document.querySelector('.message__name').innerHTML = '';
        document.querySelector('.message__name').innerHTML = `PLAYER ${winningPlayer + 1} WINS!`;
    }

    _removeWinnerMessage(){
        document.querySelector('.game-container').classList.remove('winner-message');
        document.querySelector('.message__container').classList.add('hide-message');
    }

    _playAgain(){
        const parentEl = document.querySelector('.message__btn--container');

        parentEl.addEventListener('click', function(e){
            e.preventDefault();

            const btn = e.target.closest('.message__btn--play');

            if(!btn) return;

            this._removeWinnerMessage();
        }.bind(this));
    }

    _quitGame(){
        const parentEl = document.querySelector('.message__btn--container');

        parentEl.addEventListener('click', function(e){
            e.preventDefault();

            const btn = e.target.closest('.message__btn--quit');

            if(!btn) return;

            this._removeWinnerMessage();
        }.bind(this));
    }
}

export default new WinningView(); 