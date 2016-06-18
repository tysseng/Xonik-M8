import d3 from 'd3';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'react';

class MatrixSvgNode extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.svgNode = d3.select(this.refs.svgNode);

    this.svgNode.on('mousedown', () => {
        // set starting point for moving node
        let [x, y] = d3.mouse(document.getElementById(this.props.drawingAreaId));
        let selectedNode = this.svgNode[0][0];    

        // TODO: This is state, but not state that will survive a refresh gracefully...
        let offsetX = x - selectedNode.getAttribute('x');
        let offsetY = y - selectedNode.getAttribute('y');

        // select node
        let nodeId = selectedNode.getAttribute('data-node-id');
        this.props.onNodeClick(nodeId, offsetX, offsetY);

    });

    this.svgNode.on('mouseup', () => {
      if(this.props.mode === 'move_node'){
        this.props.onNodeMoveEnded();
      }
    });
  }

  getClassName(defaultName, id, selected, valid){

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
    let node = this.props.node;    
    let className = this.getClassName('nodebox', node.id, this.props.selected, node.valid);

    return (
      <g className='node' key={'nodegroup' + node.id}>
        <rect ref='svgNode' data-node-id={node.id} key={'node' + node.id} x={node.vis.x} y={node.vis.y} rx="10" ry="10" width="40" height="40" className={className}/>
        <text key={'label' + node.id} textAnchor="middle" x={node.vis.x + 20 } y={node.vis.y + 52} className='label'>{node.name}</text>
      </g>
    );
  }
};

export default MatrixSvgNode;