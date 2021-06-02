

 export default class View{
    _player1;
    _player2;
    _activePlayer = 0;
    _clearHTML(){
        this._parentElement.innerHTML = '';
    }

    _getPlayerNames(){
        this._player1 = document.querySelector('.player__name--0').textContent.trim();
        this._player2 = document.querySelector('.player__name--1').textContent.trim();
    }

    getPlayerData(handler){
        this._getPlayerNames();
        handler(this._player1, this._player2);
    }
}
