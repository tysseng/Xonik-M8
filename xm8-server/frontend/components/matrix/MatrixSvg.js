//TODO: Test https://github.com/Olical/react-faux-dom
// TODO: Make canvas scalable, keep inputs/outputs on the left/right/side.
// Make it possible to reorder inputs/outputs vertically, make them snap in place.

// TODO: List from-to-node in node details box. make clickable.
// TODO: List consumers, make clickable
// TODO: Show reachable
// SELECT multiple by starting a drag outside a node
// TODO: Reset nodes selected for linking when file dialog opens (use mode for file dialog opening?)
// TODO: Change color of small icons
// TODO: Add node icons
// TODO: Add call to action-color to main buttons
// TODO: Click outside of a node should close node/link

import d3 from 'd3';

import React from 'react';
import {Component} from 'react';
import _ from 'lodash';
import MatrixSvgNode from './MatrixSvgNode';
import MatrixSvgLink from './MatrixSvgLink';

class MatrixSvg extends Component {
  constructor(props) {
    super(props);

    // expose metbods with this bound to the current class instance instead of the calling component
    this.onNodeClick = (nodeId, offsetX, offsetY) => this.onNodeClickInternal(nodeId, offsetX, offsetY);
    
  }

  componentDidMount() {
    this.svg = d3.select(this.refs.svg);

    this.svg.on('mousedown', () => {
      this.updateMousePos();
     
    });
    this.svg.on('touchstart', () => {
        this.updateTouchPos();
    });
    this.svg.on('mousemove', () => {
        this.updateMousePos();
    });
    this.svg.on('touchmove', () => {
        this.updateTouchPos();
    });
    this.svg.on('mouseup', () => {

    });
    this.svg.on('touchend', () => {
        
    });
    this.svg.on('mouseleave', () => {
        
    });
  }

  onNodeClickInternal(nodeId, offsetX, offsetY) {

    let fromNodeId = this.props.linkDialog.fromNodeId;
    
    if(this.props.mode === 'create_link'){
      if(!fromNodeId){
        this.props.setLinkFromNode(nodeId);
      } else if(fromNodeId === nodeId){
        this.props.setLinkFromNode('');
      } else {
        this.props.setLinkToNode(nodeId);
      }
    } else {
      this.props.onNodeClick(nodeId, offsetX, offsetY);
    } 
  }

  createLinkBetween(from, to){
    console.log("create link ", from, to)
  }

  updateMousePos(){
    if(this.props.mode === 'create_link'){

    } else {
      if(this.props.mode === 'move_node' && this.props.selectedNodeId){

        let [x, y] = d3.mouse(this.refs.svg);
        var newX = x - this.props.offsetX;
        var newY = y - this.props.offsetY;

        this.props.onNodeMove(this.props.selectedNodeId, newX, newY);
      }
    }
  }
 
  updateTouchPos(){
    let [x, y] = d3.touches(this.refs.svg)[0];
    this.props.updateMousePos(x, y);
  }

  isLinkSelected(link, props){
    return (link.id === props.selectedLinkId);
  }

  isNodeSelected(node, props){
    if(props.mode === 'create_link'){
      return node.id === props.linkDialog.fromNodeId || node.id === props.linkDialog.toNodeId;
    } else {
      return (node.id === props.selectedNodeId);
    }
  }



  render() {    

    return (
      <div>
        <svg ref="svg" className='matrixSvg' id='matrixSvg' width='700' height='700'>
          <filter id="glow" x="-30%" y="-30%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="drop-shadow"  x="-30%" y="-30%" width="150%" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur"/>
            <feColorMatrix result="bluralpha" type="matrix" values=
                    "1 0 0 0   0
                     0 1 0 0   0
                     0 0 1 0   0
                     0 0 0 0.4 0 "/>
            <feOffset in="bluralpha" dx="1" dy="1" result="offsetBlur"/>
            <feMerge>
              <feMergeNode in="offsetBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>              

          {this.props.links.map(link => {
            return (
              <MatrixSvgLink 
              selected={this.isLinkSelected(link, this.props)} 
              link={link} nodes={this.props.nodes}
              key={'linkgroup' + link.id}
              onClick={this.props.onLinkClick}/>
            )
          })}                      

          {Object.values(this.props.nodes).map(node => {            
            let isSelected = this.isNodeSelected(node, this.props);
            return (
              <MatrixSvgNode key={node.id} 
                mode={this.props.mode}
                node={node}
                selected={isSelected}
                drawingAreaId='matrixSvg'                
                onNodeClick={this.onNodeClick}
                onNodeMoveEnded={this.props.onNodeMoveEnded}
                setLinkFromNode={this.props.setLinkFromNode}
                setLinkToNode={this.props.setLinkToNode}/>
            )
          })}    
        </svg>
      </div>
    );
  }
};

export default MatrixSvg;