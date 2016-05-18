var ReactDOM = require('react-dom');
var React = require('react');
var styles = require('./styles/styles');

import storage from './lib/storage';
import WeatherComponent from './components/WeatherComponent';


const NO_OF_DAYS = 28;


class WeatherApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    getToday() {
        var today = new Date().getDay();
        return today;
    }

    getNextDay(date) {
        var next = (date + 1) % 6;
        return next;
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <WeatherComponent  className={styles.panel} day='0' weekday={this.getToday() } />
                <WeatherComponent  className={styles.panel} day='1' weekday={this.getNextDay(this.getToday()) } />
                <WeatherComponent  className={styles.panel} day='2' weekday={this.getNextDay(this.getToday() + 1) } />
                <WeatherComponent  className={styles.panel} day='3' weekday={this.getNextDay(this.getToday()) + 2} />
            </div>
        )
    }
};

ReactDOM.render(<WeatherApp title="Weather Forecast"/>, document.getElementById('app'));

var App = {};
App.Historic = {};
(function (self) {

    var hiAvg = 0;
    var loAvg = 0;

    function getRandomInt(min, max) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        //console.log("Random int= " + rand);
        return rand;
    }

    function getHiRandom() {
        return getRandomInt(15, 25);
    };

    function getLoRandom() {
        return getRandomInt(5, 15);
    };

    self.getHiAvg = function () {
        return hiAvg;
    };

    self.getLoAvg = function () {
        return loAvg;
    };

    self.init = function (noOfDays) {
        var nDays = noOfDays;

        for (var i = 1; i <= nDays; i++) {
            hiAvg += getHiRandom();
            loAvg += getLoRandom();
        }

        hiAvg = hiAvg / nDays;
        loAvg = loAvg / nDays;
        
        storage.clear();
        
        storage.set('averageHi', hiAvg);
        storage.set('averageLo', loAvg);
    }

})(App.Historic);

App.Historic.init(NO_OF_DAYS);
