//TODO: Test https://github.com/Olical/react-faux-dom
// TODO: Make canvas scalable , keep inputs/outputs on the left/right/side.
// Make it possible to reorder inputs/outputs vertically, make them snap in place.

// TODO: Make it possible to click next to a property (link) to give it a name (...)-icon
// TODO: List from-to-node in node details box. make clickable.
// TODO: List consumers, make clickable
// TODO: Show reachable
// SELECT multiple by starting a drag outside a node
// TODO: Prevent node names from being selectable
// TODO: highlight link icon on click
// TODO: Make it possible to select node type from link dialog
// TODO: Show current parameter value in link box
// TODO: Reset nodes selected for linking when file dialog opens (use mode for file dialog opening?)

import d3 from 'd3';

import React from 'react';
import {Component} from 'react';
import _ from 'lodash';

class MatrixSvg extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.svg = d3.select(this.refs.svg);

    this.svg.on('mousedown', () => {
      let nodes = this.svg.selectAll('rect');
      nodes.on('mousedown', (d, i) => {
        // set starting point for moving node
        let [x, y] = d3.mouse(this.refs.svg);
        let selectedNode = nodes[0][i];    

        // TODO: This is state, but not state that will survive a refresh gracefully...
        this.offsetX = x - selectedNode.getAttribute('x');
        this.offsetY = y - selectedNode.getAttribute('y');

        // select node
        let nodeId = selectedNode.getAttribute('data-node-id')

        this.onNodeClick(nodeId);

      })

      let links = this.svg.selectAll('line');
      links.on('click', (d, i) => {
        let linkClicked = links[0][i];
        let linkId = linkClicked.getAttribute('data-link-id')
        this.props.onLinkClick(linkId);
      });

      this.updateMousePos();
     
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
      if(this.props.mode === 'move_node'){
        this.props.onNodeMoveEnded();
      }
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

  //TODO: Get this from state instead
  onNodeClick(nodeId) {
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
      this.props.onNodeClick(nodeId);
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
        var newX = x - this.offsetX;
        var newY = y - this.offsetY;

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

  getClassName(defaultName, id, selected, valid = true){

    let className = defaultName;
    if(selected){
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
            let isSelected = this.isLinkSelected(link, this.props);
            let className = this.getClassName('link', link.id, isSelected);

            return (
              <line data-link-id={link.id} key={'link' + link.id} x1={link.vis.from.x + 20} y1={link.vis.from.y + 20} x2={link.vis.to.x + 20} y2={link.vis.to.y + 20} className={className} />
            )
          })}                      
          {Object.values(this.props.nodes).map(node => {
            let isSelected = this.isNodeSelected(node, this.props);
            let className = this.getClassName('nodebox', node.id, isSelected, node.valid);
    
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