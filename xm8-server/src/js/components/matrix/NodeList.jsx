// TODO: REset value, unit and input type. Currently the reset does not clear type and unit.

var React = require('react');
var update = require('react-addons-update');
var $ = require('jquery');

var _ = require('lodash');

var NodeList = React.createClass({

  getInitialState: function() {
    return {
      nodes: [

      ]
    }
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({nodes: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },  

  render: function(){
    var that = this;
    return (
      <ul>
        {this.state.nodes.map(function(node){
          return <li key={node.id}>{node.name} ({node.type.name})</li>
        })} 
      </ul>
    );
  }
});

module.exports = NodeList;