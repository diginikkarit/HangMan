import React, { Component } from 'react'
import image1 from '../Images/hangman_1.png'
import image2 from '../Images/hangman_2.png'
import image3 from '../Images/hangman_3.png'
import image4 from '../Images/hangman_4.png'
import image5 from '../Images/hangman_5.png'
import image6 from '../Images/hangman_6.png'
import image7 from '../Images/hangman_7.png'
import image8 from '../Images/hangman_8.png'
import image9 from '../Images/hangman_9.png'
import image10 from '../Images/hangman10.png'

const images = [image1,image2,image3,image4,image5,image6,image7,image8,image9,image10]

export default class ShowDrawing extends Component {
  
    render() {
        return (
            <div id="ShowDrawing">
            <img src={images[this.props.imageIndex]} height="400" width="400" alt="hangmanpic"/>      
            </div>
        )
    }
}
