import React, { Component } from 'react'
import '../ShowWord.css'
export default class ShowWord extends Component {

    
    getString(){
        
        let toGuessChars = this.props.toGuessChars
        let guessedChars = this.props.guessedChars
        let currentString ="";

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

    stringToElements(str){
    let elements = str.split('').map(element =><slot> {element}</slot>)
        return elements

    }
    
    render() {
        return (
            <div id="ShowWord">
            <div className='word'>
               {this.stringToElements(this.getString())}
            </div> 
            {/* <br/>toGuessChars : {this.props.toGuessChars}        
            <br/>guessedChars : {this.props.guessedChars}         */}
            </div>
        )
    }
}
