//TODO: Test https://github.com/Olical/react-faux-dom

import d3 from 'd3';

import React from 'react';
import {Component} from 'react';

class MatrixSvg extends Component {
  constructor(props) {
    super(props);
    this.isMouseDown = false;
  }

  componentDidMount() {
    console.log("componentDidMount")
    this.svg = d3.select(this.refs.svg);

    this.svg.on('mousedown', () => {
        let nodes = this.svg.selectAll('rect');
        nodes.on('mousedown', (d, i) => {
          let [x, y] = d3.mouse(this.refs.svg);
          this.selectedNode = nodes[0][i];    
          this.offsetX = x - this.selectedNode.getAttribute('x');
          this.offsetY = y - this.selectedNode.getAttribute('y');

          console.log("Selected ", this.selectedNode);
          console.log("Offset: " + this.offsetX, this.offsetY);
        })

        this.updateMousePos();
        this.isMouseDown = true;
       
    });
    this.svg.on('touchstart', () => {
        this.updateTouchPos();
        //this.props.startParticles();
    });
    this.svg.on('mousemove', () => {
        this.updateMousePos();
    });
    this.svg.on('touchmove', () => {
        this.updateTouchPos();
    });
    this.svg.on('mouseup', () => {
        this.isMouseDown = false;
        this.selectedNode = null;
    });
    this.svg.on('touchend', () => {
        //this.props.stopParticles();
    });
    this.svg.on('mouseleave', () => {
        //this.props.stopParticles();
    });
  }

  componentDidUpdate() {
    // Update Viz Data, passing in this.handlers
  }

  updateMousePos(){
    if(this.isMouseDown && this.selectedNode){

      let [x, y] = d3.mouse(this.refs.svg);
      var newX = x - this.offsetX;
      var newY = y - this.offsetY;

      this.props.onNodeMove(this.selectedNode.getAttribute('data-node-id'), newX, newY);
    }
  }
 
  updateTouchPos(){
    let [x, y] = d3.touches(this.refs.svg)[0];
    this.props.updateMousePos(x, y);
  }

  render() {
    return (
      <div>
        <svg ref="svg" className='matrixSvg' width='300' height='300' style={{background: 'rgba(124, 224, 249, .3)'}}>
          {this.props.nodes.map(node => {
            return (
              <rect data-node-id={node.id} key={node.id} x={node.vis.x} y={node.vis.y} rx="10" ry="10" width="40" height="40" className='node'/>
            )
          })}               
        </svg>
      </div>
    );
  }
};

export default MatrixSvg;