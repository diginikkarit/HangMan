import React, { Component } from 'react'
import Keyboard from './Keyboard'
import ShowDrawing from './ShowDrawing'
import ShowWord from './ShowWord'
import wordData from '../WordData'

export default class Main extends Component {
    
    constructor(props) {
        super(props)
        
        let word =  wordData.words[2]
        let wordArray = word.split('')
        let uniqueCount = this.GetUniqueCount(word)
        
        this.state = ({
            toGuessChars:wordArray,
            guessedChars:[],
            wrongGuessCount:0,
            rightGuessCount:0,
            uniqueCount:uniqueCount,
            showGameOver:'none',
            showGameWon:'none',
            useKeyboardComponent:true
        })
    }
    
    Init(){
        console.log("Main init")
    }

    componentDidMount(){
        this.Init()
    }
    
    CharacterPressed(char){
        //console.log("Main_CharacterPressed:"+char)
        
        //add char to guessedChars
        let newGuessedArray = this.state.guessedChars
        newGuessedArray.push(char)
        this.setState({guessedChars:newGuessedArray})

        //check was and handle guess
        //console.log("guess was : "+this.CheckGuess(char,this.state.toGuessChars))

        if(this.CheckGuess(char,this.state.toGuessChars)){
            //guess was correct
            let newRightGuessCount = this.state.rightGuessCount+1;
            
            //Has player guessed all the letters? as many correct guesses as
            //there are indivial unique chars the secrec word.
            if(newRightGuessCount === this.state.uniqueCount){
                this.WinnerWinnerChickenDinner();
                console.log("Player won!")
            }else{
                //not done yet? setState and keep guessing...
                this.setState({rightGuessCount:newRightGuessCount})
            }
        }
        else{
            //Guess was false
            let guesses = this.state.wrongGuessCount+1
            guesses > 9 ? this.GameOver() : this.setState({wrongGuessCount:guesses})
        }
    }

    GetUniqueCount(str){
        //returns int of unique characters in string.
        return Array.from(new Set(str)).length
    }

    GameOver(){
        console.log("Game Over")
        this.setState({
            showGameOver:'',
            useKeyboardComponent:false
        })
    }

    WinnerWinnerChickenDinner(){
        console.log("Player has won the game")
        this.setState({
            showGameWon:'',
            useKeyboardComponent:false
        })
    }
    
    RestartGame(){
        window.location.reload();
    }

    CheckGuess(char,arr){
        let found = arr.find(element => char === element)
        if(found === undefined){
           return false
        } 
        else return true
    }

    GameOverDiv(){
        return(
            <div id="GameOverDiv" style={{display:this.state.showGameOver}}>
                <p>
                    Game Over
                    {this.ReStartButton()}
                </p>
            </div>
        )
    }

    GameWonDiv(){
        return(
            <div id="GameWonDiv" style={{display:this.state.showGameWon}}>
                <h1>Gratz! You won!</h1>
                {this.ReStartButton()}
            </div>
        )
    }

    ReStartButton(){
        return(<button onClick={this.RestartGame.bind(this)}>ReStart</button>)
    }

    RenderKeyBoard(){
            return(<Keyboard MainCharacterPressed={this.CharacterPressed.bind(this)} inUse={this.state.useKeyboardComponent}/>)
    }
    
    render() {
        return (
            <div>
                <h1>HangMan v0.3</h1>
                {this.GameOverDiv()}
                {this.GameWonDiv()}
                <ShowDrawing imageIndex={this.state.wrongGuessCount}/>
                <ShowWord toGuessChars={this.state.toGuessChars} guessedChars={this.state.guessedChars}/>
                <br/>
                <br/>
                {this.RenderKeyBoard()}
            </div>
        )
    }
}
