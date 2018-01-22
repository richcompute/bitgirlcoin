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
    this.getData = () => {
      const {data} = this.props;
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

      fetch(url).then(r => r.json())
        .then((bitcoinData) => {
          const price = bitcoinData.bpi.USD.rate_float;
          
          const monthChange = price - data[0].y;
          const monthChangeP = (price - data[0].y) / data[0].y * 100;

          const dayChange = price - data[data.length-1].y;
          const dayChangeP = (price - data[data.length-1].y) / data[data.length-1].y * 100;
          
          this.setState({
            currentPrice: bitcoinData.bpi.USD.rate_float,
            displayMonthChangeD: monthChange.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
            displayMonthChangeP: monthChangeP.toFixed(2) + '%',
           
            displayDayChangeD: dayChange.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
            displayDayChangeP: dayChangeP.toFixed(2) + '%',
            
            updatedAt: bitcoinData.time.updated
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
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
        : null}
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
