var React = require('react');
var events = require("../eventbusses.js");

var Knob = React.createClass({

  getInitialState: function() {
    return {
      value: 0,
      currentDeg: 0,
      rotation: 0,
      lastDeg: 0,
      startDeg: -1
    };          
  },  

  componentDidMount: function() {
    this.registerListener();
  },  

  registerListener: function(){
    var that = this;
    console.log("Registering listener for " + this.props.controllerId);
    events.controls.input.subscribe("" + this.props.controllerId, function(ev){
      var value = ev.detail;
      if(value > 0 && value <= 359){
        that.setState({
          rotation: value,
          currentDeg: value
        });
      }
    });
  },

  componentWillUnmount: function() {
    // Todo: Remove listener
  },  

  handleMouseDown: function(e){
    e.preventDefault();

    var knob = e.target.parentNode;

    var that = this;

    this.state.center = {
      y : knob.offsetTop + knob.offsetHeight/2,
      x: knob.offsetLeft + knob.offsetWidth/2
    };        

    knob.addEventListener("mousemove", this.handleMouseMove);
    knob.addEventListener("touchmove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  },

  handleMouseMove: function(e){
      
    var xDistance, yDistance, deg, tmp;
    var rad2deg = 180/Math.PI; 

    //e = (e.originalEvent.touches) ? e.originalEvent.touches[0] : e;                    
    yDistance = this.state.center.y - e.pageY;
    xDistance = this.state.center.x - e.pageX;
    deg = Math.atan2(yDistance,xDistance) * rad2deg;
    
    // we have to make sure that negative
    // angles are turned into positive:
    if(deg<0){
      deg = 360 + deg;
    }
    
    // Save the starting position of the drag
    if(this.state.startDeg == -1){
      this.state.startDeg = deg;
    }
    
    // Calculating the current rotation
    tmp = Math.floor((deg - this.state.startDeg) + this.state.rotation);
    
    // Making sure the current rotation
    // stays between 0 and 359
    if(tmp < 0){
      tmp = 360 + tmp;
    }
    else if(tmp > 359){
      tmp = tmp % 360;
    }
    
    // Snapping in the off position:
    /*
    if(options.snap && tmp < options.snap){
      tmp = 0;
    }*/
    
    // This would suggest we are at an end position;
    // we need to block further rotation.
    if(Math.abs(tmp - this.state.lastDeg) > 180){
      return false;
    }

    events.controls.output.publish(
      new CustomEvent("controller", {detail: {id: this.props.controllerId, value: tmp}})
    );

    // save state and trigger re-render
    this.setState({
      currentDeg: tmp,
      lastDeg: tmp
    });
  },

  handleMouseUp: function(e){
    var knob = e.target.parentNode;
    knob.removeEventListener('mousemove', this.handleMouseMove);
    knob.removeEventListener('touchmove', this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    
    // Saving the current rotation
    this.state.rotation = this.state.currentDeg;
    
    // Marking the starting degree as invalid
    this.state.startDeg = -1;
  },

  render: function() {
    return (
      <div className="knob" 
        onMouseDown={this.handleMouseDown} 
        onTouchStart={this.handleMouseDown}
        >
        <div className="top" style={{
          transform: 'rotate(' + this.state.currentDeg + 'deg)'
        }}/>

        <div className="base"/>
      </div>           
    );
  }
});

module.exports = Knob;