import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const CharsUsed = 'abcdefghijklmnopqrstuvxyzwäö'

export default class Keyboard extends Component {

    componentDidMount(){
        this.addKeyListener();
    }

    keyboardButtonClicked(char){
        if(this.props.inUse === true) {
            console.log("Keyboard_Button pressed:"+char)
            document.getElementById("button_"+char).style.display = "none"
            this.props.MainCharacterPressed(char)
        }
    }    
    
    createButtons(){

        let buttons = CharsUsed.split('').map
        (
            char =>
                 <Button className="btn-lg m-1" id={"button_"+char} key={"key_"+char} onClick={this.keyboardButtonClicked.bind(this,char)}>{char}</Button>
        )

        return (
        <div className="m-2">
            {buttons}
        </div>
        )
    }

    addKeyListener(){
        window.addEventListener('keyup', (e) => {
            //Check if the character is in the list...
            if(CharsUsed.includes(e.key)){
            this.keyboardButtonClicked(e.key)
            }
        })
    }

    keyboardDiv(){
        if(this.props.inUse === true){
            return (
                <div id="Keyboard">
                    {this.createButtons()}
                </div>
            )
        }
    }
    
    render() {
            return (
                <div>
                    
                    {this.keyboardDiv()}
                </div>
            )
    }
}
