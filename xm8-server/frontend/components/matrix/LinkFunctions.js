import _ from 'lodash';
import paramTypes from '../../../shared/matrix/ParameterTypes.js';

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}

const getLinks = (nodes) => {

  let links = [];
  _.each(nodes, node => {
    _.each(node.params, param => {
      if(isLink(param.type) && param.value && param.value !== ""){   

        param.value.vis = {
          from: nodes[param.value.from].vis,
          to: node.vis
        }

        links.push(param.value);
      }
    });
  });
  return links;
}

export {getLinks};