import View from './view.js';
import {MAX_SCORE} from '../config.js';

class NewGameView extends View{
    _parentElement = document.querySelector('.btn__new-game--container');

    newGame(handler){
        this._parentElement.addEventListener('click', function(e){
            e.preventDefault();
            this._player1 = document.querySelector('.player--0');
            this._player2 = document.querySelector('.player--1');
            this._player1Total = document.querySelector('.totalScore--0');
            this._player2Total = document.querySelector('.totalScore--1');
            this._player1Current = document.querySelector('.current-score--0');
            this._player2Current = document.querySelector('.current-score--1');
            this._activeUserClass = document.querySelector('.active');
            this._player1DiceContainer = document.querySelector('.dice__container--0');
            this._player2DiceContainer = document.querySelector('.dice__container--1');
        

            const btn = e.target.closest('.btn__new-game');

            if(!btn) return;

            //clear scores displayed in the DOM
            this._clearScores();

            //clear scores from the state
            this._clearScoresFromState(handler);

            //set the active player to player 1
            this._setActiveUser();

        }.bind(this));
    }

    _clearScores(){
        this._player1Total.innerHTML = 0;
        this._player2Total.innerHTML = 0;
        this._player1Current.innerHTML = 0;
        this._player2Current.innerHTML = 0;
        this._player1DiceContainer.innerHTML = '';
        this._player2DiceContainer.innerHTML = '';
        document.getElementById('container').dataset.activeUser = 0;
        document.getElementById('container').dataset.rolledStatus = 0;
    }

    _setActiveUser(){
        this._player1.classList.add('active');
        this._player2.classList.remove('active');
    }
    

    _clearScoresFromState(handler){
        handler();
    }

    
}

export default new NewGameView();