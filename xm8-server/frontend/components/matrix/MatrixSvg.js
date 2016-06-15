//TODO: Test https://github.com/Olical/react-faux-dom
// TODO: Make canvas scalable , keep inputs/outputs on the left/right/side.
// Make it possible to reorder inputs/outputs vertically, make them snap in place.

// TODO- BUG: Select on start of click and not if dragging.

// TODO: Make it possible to click next to a property (link) to give it a name (...)-icon
// TODO: List from-to-node in node details box. make clickable.
// TODO: List consumers, make clickable
// TODO: Show reachable
// TODO: Make linking by clicking.
// SELECT multiple by starting a drag outside a node

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
          // set starting point for moving node
          let [x, y] = d3.mouse(this.refs.svg);
          this.nodeToMove = nodes[0][i];    
          this.offsetX = x - this.nodeToMove.getAttribute('x');
          this.offsetY = y - this.nodeToMove.getAttribute('y');

          // select node
          let nodeId = this.nodeToMove.getAttribute('data-node-id')
          this.props.onNodeClick(nodeId);          
        })

        let links = this.svg.selectAll('line');
        links.on('click', (d, i) => {
          let linkClicked = links[0][i];
          let linkId = linkClicked.getAttribute('data-link-id')
          this.props.onLinkClick(linkId);
        });



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
        this.nodeToMove = null;
    });
    this.svg.on('touchend', () => {
        //this.props.stopParticles();
    });
    this.svg.on('mouseleave', () => {
        //this.props.stopParticles();
    });
  }

  componentDidUpdate() {
    
  }

  updateMousePos(){
    if(this.isMouseDown && this.nodeToMove){

      let [x, y] = d3.mouse(this.refs.svg);
      var newX = x - this.offsetX;
      var newY = y - this.offsetY;

      this.props.onNodeMove(this.nodeToMove.getAttribute('data-node-id'), newX, newY);
    }
  }
 
  updateTouchPos(){
    let [x, y] = d3.touches(this.refs.svg)[0];
    this.props.updateMousePos(x, y);
  }

  getClassName(defaultName, id, selectedId, valid = true){
    let className = defaultName;
    if(id === selectedId){
      className += ' selected';
    }
    if(!valid){
      className += ' invalid';
    }
    return className;
  }

  render() {
    return (
      <div>
        <svg ref="svg" className='matrixSvg' width='700' height='700' style={{background: 'rgba(124, 224, 249, .3)'}}>
          {this.props.links.map(link => {
            let className = this.getClassName('link', link.id, this.props.selectedLinkId);

            return (
              <line data-link-id={link.id} key={'link' + link.id} x1={link.vis.from.x + 20} y1={link.vis.from.y + 20} x2={link.vis.to.x + 20} y2={link.vis.to.y + 20} className={className} />
            )
          })}                      
          {this.props.nodes.map(node => {
            let className = this.getClassName('nodebox', node.id, this.props.selectedNodeId, node.valid);
    
            return (
              <g className='node' key={'nodegroup' + node.id}>
                <rect data-node-id={node.id} key={'node' + node.id} x={node.vis.x} y={node.vis.y} rx="10" ry="10" width="40" height="40" className={className}/>
                <text key={'label' + node.id} textAnchor="middle" x={node.vis.x + 20 } y={node.vis.y + 52} className='label'>{node.name}</text>
              </g>
            )
          })}    
        </svg>
      </div>
    );
  }
};

export default MatrixSvg;