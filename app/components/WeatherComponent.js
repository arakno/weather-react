import React from 'react';
import fetchWeatherData from '../api/fetchWeatherData';
import xml2json from '../lib/xml2json';
import storage from '../lib/storage';

import styles from '../styles/styles';


export default React.createClass({

    getInitialState() {
        return {
            forecast: 'Loading...',
            tempHi: 0,
            tempLo: 0
        };
    },


    componentDidMount() {
        
        var self = this;
        var json;
        var day = this.props.day;

        function getAverage(weatherAPITemp, average) {
            var avg = Math.floor(average);
            
            if(avg){
                if (weatherAPITemp > avg) {
                    return " +" + (weatherAPITemp - avg);
                } else if (weatherAPITemp < avg) {
                    return " -" + (avg - weatherAPITemp);
                }
            } 
        }
        
        fetchWeatherData.getWSdata("http://arakno.net/proxy.php?url=" + encodeURIComponent('http://wxdata.weather.com/wxdata/weather/local/UKXX0085?cc=*&unit=m&dayf=4'))
            .then(function (res) {

                var parser = new DOMParser();
                var xml = parser.parseFromString(res, 'text/xml');
                json = xml2json.parse(xml);

                storage.set('forecast' + day, json);

                var hi = json.weather.dayf.day[day].hi['#text'];
                var lo = json.weather.dayf.day[day].low['#text'];


                self.setState({
                    'forecast': json.weather.dayf.day[day].part[1].bt['#text'],
                    'tempHi': hi,
                    'tempLo': lo,
                    'avgHi': getAverage(hi, storage.get('averageHi')),
                    'avgLo': getAverage(lo, storage.get('averageLo')),
                })

            }).catch(function (err) {
                console.error('XHR: Something went wrong', err);
            });

    },

    getWeekDay(date) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var next = (date) % 7;
        return days[next];
    },

    render() {
        return (
            <div>
                <h3>{this.props.day == 0 ? 'Today' : this.getWeekDay(this.props.weekday) }</h3>
                <ul>
                    <li className={styles.val}>Forecast: {this.state.forecast}</li>
                    <li className={styles.val}>temp High: {this.state.tempHi} 
                        <span className={styles.avg}> {this.state.avgHi} </span>
                    </li>
                    <li className={styles.val}>Temp Low: {this.state.tempLo} 
                        <span className={styles.avg}>{this.state.avgLo}</span>
                    </li>
                </ul>
            </div>
        );
    }
});