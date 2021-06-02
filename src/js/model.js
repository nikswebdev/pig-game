import {PLAYER_1_INDEX, PLAYER_2_INDEX, MAX_SCORE} from './config.js';


export const state = [
    {
        name:'',
        currentScore: 0,
        totalScore: 0,
        active: true,

        history:{
            wins: 0,
            losses: 0,
            scores: [{
                user: 0,
                opponent: 0,
            }],
        }
    },

    {
        isCPU: true,
        name:'',
        currentScore: 0,
        totalScore: 0,
        active: false,

        history:{
            wins: 0,
            losses: 0,
            scores: [{
                user: 0,
                opponent: 0,
            }],
        }
    },
    
    {activePlayer: 1}
]

//load player names into the game state
export const loadPlayerData = function(player1, player2){
    state[PLAYER_1_INDEX].name = player1;
    state[PLAYER_2_INDEX].name = player2;
}

export const storeCurrentScore = function(playerNumber, diceRoll){
    if(!playerNumber){
        if(diceRoll === 1) state[PLAYER_1_INDEX].currentScore = 0;
        else{
            state[PLAYER_1_INDEX].currentScore += diceRoll;
            state[PLAYER_2_INDEX].currentScore = 0;
        }
       
    }

    if(playerNumber){
        if(diceRoll === 1) state[PLAYER_2_INDEX].currentScore = 0;
        else{
            state[PLAYER_2_INDEX].currentScore += diceRoll;
            state[PLAYER_1_INDEX].currentScore = 0;
        }
    }
}

export const sendCurrentScore = function(activePlayer){
    return state[activePlayer].currentScore;
}

export const loadTotalScore = function(player, score){
    state[player].totalScore += score;
}

export const sendTotalScore = function(player){
    return state[player].totalScore;
}

export const clearScores = function(){
    state[PLAYER_1_INDEX].currentScore = 0;
    state[PLAYER_2_INDEX].currentScore = 0;

    state[PLAYER_1_INDEX].totalScore = 0;
    state[PLAYER_2_INDEX].totalScore = 0;
}

export const sendWinner = function(){
  let winner = '';
  state.forEach(function(player, index){
        if(index === 2) return;
        if(player.totalScore >= MAX_SCORE){
            winner = index;
        };
    });

    return winner;
}
