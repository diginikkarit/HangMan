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
           showGameOver:''
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
    
    render() {
        return (
            <div>
                <h1>HangMan v0.1</h1>
                <h2>Main</h2>
                <p id="GameOver" style={{display:this.state.showGameOver}}>
                    Game Over
                    <button onClick={this.RestartGame.bind(this)}>ReStart</button>
                </p>
                <ShowDrawing imageIndex={this.state.wrongGuessCount}/>
                <ShowWord toGuessChars={this.state.toGuessChars} guessedChars={this.state.guessedChars}/>
                <Keyboard MainCharacterPressed={this.CharacterPressed.bind(this)}/>
            </div>
        )
    }
}
