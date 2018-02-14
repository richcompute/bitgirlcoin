import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';
import EmotionImage from './EmotionImage';
import SubscribeForm from './SubscribeForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingPrice: true,
      fetchingHistory: true,
      data: null,
      hoverLoc: null,
      activePoint: null
    }
  }
  handleChartHover(hoverLoc, activePoint){
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }
  componentDidMount(){
    const getCurrentPrice = () => {
        const url =  'https://api.coindesk.com/v1/bpi/currentprice.json';
        
        fetch(url).then(r => r.json())
            .then((bitcoinData) => {
            
            this.setState({
                currentPrice: bitcoinData.bpi.USD.rate_float,
                updatedAt: bitcoinData.time.updated,
                fetchingPrice : false
            })
            })
        .catch((e) => {
          console.log(e);
        });
    }            
      
    const getData = () => {
      const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

      fetch(url).then( r => r.json())
        .then((bitcoinData) => {
          const sortedData = [];
          let count = 0;
          for (let date in bitcoinData.bpi){
            sortedData.push({
              d: moment(date).format('MMM DD'),
              p: bitcoinData.bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
              x: count, //previous days
              y: bitcoinData.bpi[date] // numerical price
            });
            count++;
          }
          this.setState({
            data: sortedData,
            fetchingHistory: false
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }
    
    getCurrentPrice();
    getData();
  }

  render() {
      const formProps = {
          action: '//xxxx.us13.list-manage.com/subscribe/post?u=695fze434a101fd2a718afddde8&id=72al97ece5',
          messages: {
              inputPlaceholder: "Your email",
              btnLabel: "Subscribe!",
              sending: "Subscription in progress...",
              success: "Subscribed!",
              error: "Oops, impossible to register this email!"
          },
          styles: {
              sending: {
                  fontSize: 18,
                  color: "auto"
              },
              success: {
                  fontSize: 18,
                  color: "green"
              },
              error: {
                  fontSize: 18,
                  color: "red"
              }
          }
      }

    return (

      <div className='container'>
        <div className='row'>
          <h1>Bitcoin Girl 30 Days Bitcoin Price Chart</h1>
        </div>
        <div className='row'>
          { (!this.state.fetchingHistory && !this.state.fetchingPrice) ?
          <InfoBox data={this.state.data} currentPrice={this.state.currentPrice} updatedAt={this.state.updatedAt} />
          : null }
        </div>
        <div className='row'>
        { (!this.state.fetchingHistory && !this.state.fetchingPrice) ?
          <EmotionImage data={this.state.data} currentPrice={this.state.currentPrice} updatedAt={this.state.updatedAt} />
        : null }
        </div>
          <div className='row'><h2>Subscribe to the daily Bitcoin Girl Mailing list!</h2></div>
        <div className='row'>

            <SubscribeForm {...formProps}/>
        </div>
        <div className='row'>
          <div className='popup'>
            {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
          </div>
        </div>
        <div className='row'>
          <div className='chart'>
            { (!this.state.fetchingHistory && !this.state.fetchingPrice) ?
              <LineChart data={this.state.data} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
              : null }
          </div>
        </div>
        <div className='row'>
          <div id="coindesk">Powered by <a href="http://www.coindesk.com/price/">CoinDesk</a></div>
        </div>
      </div>
    );
  }
}

export default App;
