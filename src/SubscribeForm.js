import React, { Component } from 'react';
import moment from 'moment';
import './SubscribeForm.css';

class SubscribeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribe: false
        }
    }

    componentDidMount(){
        this.setState(
            {
            }
        )
    }
    componentWillUnmount(){
    }

    generate() {
        if (this.state.subscribe) {
            return <p>Thank you. You're now subscribed to our Bitgirl Coin mailing list.</p>
        } else {
            return <h2>nothing to show</h2>
        }
    }

    render(){
        return (
            <div>
            <form>
                <p>
                Email: <input text="text" name="email"/>
                </p>
                    <button onClick={() => this.setState({subscribe:true})}>Subscribe</button>
                {this.generate()}
            </form>
            </div>
        )
    }
}

export default SubscribeForm;
