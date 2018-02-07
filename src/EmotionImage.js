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

  componentDidMount(){
      const data = this.props.data;
      const price = this.props.currentPrice;

      const dayChange = price - data[data.length-1].y;
      const dayChangeP = (price - data[data.length-1].y) / data[data.length-1].y * 100;

      const imageGood = require('./images/good/1.jpg');
      const imageBad = require('./images/bad/1.jpg');
      const imageNeutral = require('./images/neutral/1.png');

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
