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
    }
  }
  componentDidMount(){
  }
  componentWillUnmount(){
  }
  render(){
    return (
           <img src={imagehappy} />  
    );
  }
}

export default EmotionImage;
