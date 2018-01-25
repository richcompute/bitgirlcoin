import React, { Component } from 'react';
import moment from 'moment';
import './EmotionImage.css';

import imagehappy from './images/imagehappy.jpg';
import imagenormal from './images/imageneutral.png';
import imagesad from './images/imagesad.jpg';


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

      var imageToSet;
      if (dayChangeP > 0) {
        imageToSet = imagehappy;
      } else if (dayChangeP < 0) {
        imageToSet = imagesad;
      } else {
        imageToSet = imagenormal;
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
