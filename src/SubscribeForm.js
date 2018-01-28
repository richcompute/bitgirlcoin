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

        } else {
            return <h2>nothing to show</h2>
        }
    }

    render(){
        return (
            <div>
            <button onClick={() => this.setState({subscribe:true})}>Subscribe</button>
        {this.generate()}
            </div>
        )
    }
}

export default SubscribeForm;
