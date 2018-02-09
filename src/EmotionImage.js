import React, { Component } from 'react';
import moment from 'moment';
import './EmotionImage.css';

class EmotionImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  componentDidMount(){
      const data = this.props.data;
      const price = this.props.currentPrice;

      const dayChange = price - data[data.length-1].y;
      const dayChangeP = (price - data[data.length-1].y) / data[data.length-1].y * 100;

      const imageGood = require('./images/good/' + this.getRandomInt(1,5) + '.jpg');
      const imageBad = require('./images/bad/' + this.getRandomInt(1,5) + '.jpg');
      const imageNeutral = require('./images/neutral/' + this.getRandomInt(1,5) + '.png');

      var imageToSet;
      if (dayChangeP > 0) {
        imageToSet = imageGood;
      } else if (dayChangeP < 0) {
        imageToSet = imageBad;
      } else {
        imageToSet = imageNeutral;
      }

    this.setState(
        {
            image: imageToSet
        }
    )
  }
  componentWillUnmount(){
  }
  render(){
    return (
           <img src={this.state.image} />
    );
  }
}

export default EmotionImage;
