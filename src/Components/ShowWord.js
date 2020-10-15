import React, { Component } from 'react'

export default class ShowWord extends Component {

    GetString(){
        
        let toGuessChars = this.props.toGuessChars
        let guessedChars = this.props.guessedChars
        let currentString = "";

        toGuessChars.forEach(element => {
            
            let char = guessedChars.find(e => e === element)
            
            if(char !== undefined){
                currentString += char
            }
            else{
                currentString += '_'
            }
        });

        return currentString
    }
    
    render() {
        return (
            <div id="ShowWord">
            <div style={{fontSize:60}}>
                {this.GetString()}
            </div> 
            {/* <br/>toGuessChars : {this.props.toGuessChars}        
            <br/>guessedChars : {this.props.guessedChars}         */}
            </div>
        )
    }
}