import React, { Component } from 'react'
import Keyboard from './Keyboard'
import ShowDrawing from './ShowDrawing'
import ShowWord from './ShowWord'
import wordData from '../WordData'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Main extends Component {
    
    constructor(props) {
        super(props)
        
        let word =  this.getRandomFromArray(wordData.words)
        let wordArray = word.split('')
        let uniqueCount = this.getUniqueCount(word)
        
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

    CharacterPressed(char){
        //has char been used? if so, don't continue.
        if(this.state.guessedChars.includes(char)) return;        
        
        //add char to guessedChars
        let newGuessedArray = this.state.guessedChars
        newGuessedArray.push(char)
        this.setState({guessedChars:newGuessedArray})

        //check was and handle guess
        //console.log("guess was : "+this.CheckGuess(char,this.state.toGuessChars))

        if(this.checkGuess(char,this.state.toGuessChars)){
            //guess was correct
            let newRightGuessCount = this.state.rightGuessCount+1;
            
            //Has player guessed all the letters? as many correct guesses as
            //there are indivial unique chars the secrec word.
            if(newRightGuessCount === this.state.uniqueCount){
                this.winnerWinnerChickenDinner();
                console.log("Player won!")
            }else{
                //not done yet? setState and keep guessing...
                this.setState({rightGuessCount:newRightGuessCount})
            }
        }
        else{
            //Guess was false
            let guesses = this.state.wrongGuessCount+1
            guesses > 9 ? this.gameOver() : this.setState({wrongGuessCount:guesses})
        }
    }

    getRandomFromArray(arr){
        let random = Math.floor(Math.random()*(arr.length))
        return arr[random]
    }

    getUniqueCount(str){
        //returns int of unique characters in string.
        return Array.from(new Set(str)).length
    }

    gameOver(){
        console.log("Game Over")
        this.setState({
            showGameOver:'',
            useKeyboardComponent:false
        })
    }

    winnerWinnerChickenDinner(){
        console.log("Player has won the game")
        this.setState({
            showGameWon:'',
            useKeyboardComponent:false
        })
    }
    
    restartGame(){
        window.location.reload();
    }

    checkGuess(char,arr){
        let found = arr.find(element => char === element)
        if(found === undefined){
           return false
        } 
        else return true
    }

    gameOverDiv(){
        return(
            <div id="GameOverDiv" style={{display:this.state.showGameOver}}>
                <p>
                    <h2>Game over! </h2>
                    <p>You where hanged!</p>
                    {this.reStartButton()}
                </p>
            </div>
        )
    }

    gameWonDiv(){
        return(
            <div id="GameWonDiv" style={{display:this.state.showGameWon}}>
                <h1>Gratz! You won!</h1>
                {this.reStartButton()}
            </div>
        )
    }

    reStartButton(){
        return(<Button onClick={this.restartGame.bind(this)}>Restart</Button>)
    }

    keyboardDiv(){
            return(<Keyboard MainCharacterPressed={this.CharacterPressed.bind(this)} inUse={this.state.useKeyboardComponent}/>)
    }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col xs lg="2" style={{backgroundColor:'lightGreen'}}>
                            <div>
                            <h3>Guess the word!</h3>
                            <p>Use mouse or keyboard to select characters. All right characters are revealed from the secret word.</p>
                            <p>Wrong guesses will get you hanged.</p>
                            {this.gameOverDiv()}
                            {this.gameWonDiv()}
                            </div>
                    </Col>
                    <Col xs lg="10" style={{backgroundColor:'lightBlue'}}>
                        <div>
                            <h1>HangMan v0.3</h1>
                            <div>
                                <ShowDrawing imageIndex={this.state.wrongGuessCount}/>
                            </div>
                            <div>
                                <ShowWord toGuessChars={this.state.toGuessChars} guessedChars={this.state.guessedChars}/>
                            </div>
                            <br/>
                            <br/>
                            <div>
                                {this.keyboardDiv()}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
