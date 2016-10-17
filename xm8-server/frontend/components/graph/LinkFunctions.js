import _ from 'lodash';
import { paramTypesById } from '../../../shared/graph/ParameterTypes.js';

const isLink = (type) => {
  return type === paramTypesById.LINK.id;
}

export const getLinks = (nodes) => {

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