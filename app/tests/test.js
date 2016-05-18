import React from 'react';
import TestUtils from 'react-addons-test-utils';
import test from 'tape';

function shallowRenderTodo() {
  const renderer = TestUtils.createRenderer();
  renderer.render(<WeatherComponent title={title} />);
  return renderer.getRenderOutput();
}


test('Weather component', (t) => {
  t.test('tests if weekdays map to 7 day slots', (t) => {

      var dateConverter = function(){
    
        var self = this;
        
        self.getToday = function(){
        return new Date().getDay();//js is 0 based index
        } 
        
        self.getNextDay = function(date){
        return ((date + 1) % 6) + 1;
        }; 
    };


  });
});
