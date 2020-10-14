import React, { Component } from 'react'

const CharsUsed = 'abcdefghijklmnopqrstuvxyzwäö'

export default class Keyboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    KeyboardButtonClicked(char){
        console.log("Keyboard_Button pressed:"+char)
        document.getElementById("button_"+char).style.display = "none"
        this.props.MainCharacterPressed(char)
    }    
    
    CreateButtons(){
        let buttons = CharsUsed.split('').map(char => <button id={"button_"+char} onClick={this.KeyboardButtonClicked.bind(this,char)}>{char}</button>)
        return buttons
    }
    
    render() {
        return (
            <div id="Keyboard">
                <h3>Keyboard component</h3>
                {this.CreateButtons()}
            </div>
        )
    }
}
