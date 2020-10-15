import React, { Component } from 'react'
import Keyboard from './Keyboard'
import ShowDrawing from './ShowDrawing'
import ShowWord from './ShowWord'
import wordData from '../WordData'

export default class Main extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
           toGuessChars:[],
           guessedChars:[],
           wrongGuessCount:0,
           showGameOver:'none',
           showGameWon:'none'
        }
    }
    
    Init(){
        console.log("Main init")
        let word =  wordData.words[2]
        let wordArray = word.split('')
        let uniqueCount = this.GetUniqueCount(word)

        this.setState({
            toGuessChars:wordArray,
            guessedChars:[],
            wrongGuessCount:0,
            rightGuessCount:0,
            uniqueCount:uniqueCount
        })
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
            this.setState({rightGuessCount:this.state.rightGuessCount+1})
            
            //Has player guessed all the letters? as many correct guesses as
            //there are indivial unique chars the secrec word.
            if(this.state.rightGuessCount+1 === this.state.uniqueCount){
                this.WinnerWinnerChickenDinner();
                console.log("Player won!")
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
        this.setState({showGameOver:''})
    }

    WinnerWinnerChickenDinner(){
        console.log("Player has won the game")
        this.setState({showGameWon:''})
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
                    <button onClick={this.RestartGame.bind(this)}>ReStart</button>
                </p>
            </div>
        )
    }

    GameWonDiv(){
        return(
            <div id="GameWonDiv"  style={{display:this.state.showGameWon}}>
                <h1>Gratz! You won!</h1>
            </div>
        )
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
                <Keyboard MainCharacterPressed={this.CharacterPressed.bind(this)}/>
            </div>
        )
    }
}
