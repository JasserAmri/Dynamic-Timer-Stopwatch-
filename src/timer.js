import React, { Component } from 'react'
import './App.css';
import { Button } from 'react-bootstrap';

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            isOn: false,
            start: 0,
        }
        this.startTimer = this.startTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
    }

    startTimer() {
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time,
            isOn: true
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);
    }
    stopTimer() {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }
    resetTimer() {
        this.setState({ time: 0 })
    }

    msToHMS = (time) => {
        // 1- Convert to seconds:
        var seconds = time / 1000;
        // 2- Extract hours:
        var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = Math.floor(seconds % 60);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return [hours, minutes, seconds];
    }
    


    render() {
        let start = (this.state.time === 0) ?
            <Button variant="outline-primary" onClick={this.startTimer}>Start</Button> : null
        let stop = (this.state.isOn) ?
            <Button variant="outline-primary" onClick={this.stopTimer}>Stop</Button> : null
        let reset = (this.state.time !== 0 && !this.state.isOn) ?
            <Button variant="outline-primary" onClick={this.resetTimer}>Reset</Button> : null
        let resume = (this.state.time !== 0 && !this.state.isOn) ?
            <Button variant="outline-primary" onClick={this.startTimer}>Resume</Button> : null
        return (<div className='Timer'>
            <div className='time'>
                <h1 className='Hour'>{this.msToHMS(this.state.time)[0]}</h1>
                <h1>:</h1>
                <h1 className='Minutes'>{this.msToHMS(this.state.time)[1]}</h1>
                <h1>:</h1>
                <h1 className='Seconds'>{this.msToHMS(this.state.time)[2]}</h1>
            </div>
            <div className='label'>
                <h4>Hours</h4>
                <h4>Minutes</h4>
                <h4>Seconds</h4>
                {start}
                {resume}
                {stop}
                {reset}

            </div>
        </div>
        )
    }
}

export default Timer;

