import d3 from 'd3';
import React from 'react';
import {Component} from 'react';
let nodeTypes = require('../../../shared/matrix/NodeTypes.js').idMap;

class MatrixSvgLink extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let svgLink = d3.select(this.refs.svgLink);

    svgLink.on('click', () => {
      let linkClicked = svgLink[0][0];
      let linkId = linkClicked.getAttribute('data-link-id')
      this.props.onClick(linkId);
    });  
  }

  getClassName(){
    let className = 'link';
    if(this.props.selected){
      className += ' selected';
    }
    return className;
  }

  render() {
    let link = this.props.link;
    let toNode = this.props.nodes[link.to];
    let toParam = nodeTypes[toNode.type].params[link.toParam];
    let linkName = link.name ? link.name : toParam.name.toLowerCase();
    let className = this.getClassName();

    let x1 = link.vis.from.x + 20;
    let y1 = link.vis.from.y + 20;
    let x2 = link.vis.to.x + 20;
    let y2 = link.vis.to.y + 20;

    return (
      <g ref='svgLink' data-link-id={link.id}>
        <path id={'svg-link-' + link.id} d={'M' + x1 +' ' + y1 + ' L' + x2 + ' ' + y2} className={className} /> 
        {link.showNameInGraph &&              
          <text dy='-3' textAnchor="middle" className='linkLabel'>
            <textPath startOffset="50%" xlinkHref={'#svg-link-' + link.id}>
              {linkName}
            </textPath>
          </text>                
        }
      </g>
    );
  }
};

export default MatrixSvgLink;