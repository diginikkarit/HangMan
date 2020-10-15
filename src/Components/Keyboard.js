import React, { Component } from 'react'

const CharsUsed = 'abcdefghijklmnopqrstuvxyzwäö'

export default class Keyboard extends Component {

    componentDidMount(){
        this.AddKeyListener();
    }

    KeyboardButtonClicked(char){
        console.log("Keyboard_Button pressed:"+char)
        document.getElementById("button_"+char).style.display = "none"
        this.props.MainCharacterPressed(char)
    }    
    
    CreateButtons(){
        let buttons = CharsUsed.split('').map
        (
            char => <button id={"button_"+char} key={"key_"+char} onClick={this.KeyboardButtonClicked.bind(this,char)}>{char}</button>
        )
        return buttons
    }

    AddKeyListener(){
        window.addEventListener('keyup', (e) => {
            //Check if the character is in the list...
            if(CharsUsed.includes(e.key)){
            this.KeyboardButtonClicked(e.key)
            }
        })

    }
    
    render() {
        return (
            <div id="Keyboard">
                {this.CreateButtons()}
            </div>
        )
    }
}
