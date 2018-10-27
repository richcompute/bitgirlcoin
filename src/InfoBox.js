import React, { Component } from 'react';
import moment from 'moment';
import './InfoBox.css';

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
      monthChangeD: null,
      monthChangeP: null,
      updatedAt: null
    }
  }
  componentDidMount(){
      const data = this.props.data;
      const price = this.props.currentPrice;
      const updatedAt = this.props.updatedAt;
      
      const dayChange = data[data.length-1].y - data[data.length-2].y;
      const dayChangeP = (data[data.length-1].y - data[data.length-2].y) / data[data.length-2].y * 100;
          
      this.setState({
        currentPrice: price,
       
        displayDayChangeD: dayChange.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
        displayDayChangeP: (dayChangeP >= 0 ? '+' : '0') + dayChangeP.toFixed(2) + '%',
        
        updatedAt: updatedAt
      })
  }
  componentWillUnmount(){
    clearInterval(this.refresh);
  }
  render(){
    return (
      <div id="data-container">
        { this.state.currentPrice ?
          <div id="left" className='box'>
            <div className="heading">{this.state.currentPrice.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}</div>
            <div className="subtext">{'Updated ' + moment(this.state.updatedAt ).fromNow()}</div>
          </div>
        : 
              <div id="left" className='box'>
            <div className="heading">NO PRICE :(</div>
            <div className="subtext">NO UPDATE :(</div>
          </div>
    
        
        }
       { this.state.currentPrice ?
          <div id="middle" className='box'>
            <div className="heading">{this.state.displayDayChangeD}</div>
            <div className="subtext">Change Since Last Day (USD)</div>
          </div>
       : null}

       { this.state.currentPrice ?
          <div id="right" className='box'>
            <div className="heading">{this.state.displayDayChangeP}</div>
            <div className="subtext">Change Since Last Day (%)</div>
          </div>
       : null}
      </div>
    );
  }
}

export default InfoBox;
