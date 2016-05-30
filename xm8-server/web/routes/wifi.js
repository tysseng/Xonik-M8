/*
Xonik M8 ws & http server

Go to http://pi_address/

TODO: Sanitize inputs
*/
var wifi = require('../../core/wifi/wifi.js');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
  wifi.getAvailableNetworks(
    function(networks){
      res.status(200).send(networks);
    },
    function(err){
      res.status(500).send(err);
    });
});

router.get('/connectedok', function(req, res){
  var lastConnectionError = wifi.getLastConnectionError();
  if(lastConnectionError){
    console.log("Last connect failed: " + lastConnectionError);
    res.status(500).send(lastConnectionError);
  } else {
    res.status(200).send();    
  }
});

router.get('/connected', function(req, res){
  var connectedNet = wifi.getConnectedNet();
  if(connectedNet){
    res.status(200).send(connectedNet);
  } else {
    console.log("Not connected to any net");
    res.status(500).send();
  }
});

router.get('/wpa/parameters', function(req, res){
  res.status(200).send(wifi.getWpaParameters());
});

router.put('/connect', function(req, res){
  wifi.connectToKnownNets(
    function(state){
      // error is used if an error occurs during normal connecting and 
      // the system reverts to ad-hoc
      var result = {
        connectedNet: state.connectedNet,
        lastConnectionError: state.lastConnectionError
      }      
      res.status(200).send(result);
    },
    function(state){
      console.log("Error");
      console.log(state.error);      
      res.status(500).send(state.error);
    });
});

router.put('/ad-hoc/connect', function(req, res){
  wifi.connectToAdHoc(
    function(state){
      var result = {
        connectedNet: state.connectedNet,
        lastConnectionError: state.lastConnectionError
      }      
      res.status(200).send(result);
    },
    function(state){
      console.log("Error");
      console.log(state.error);      
      res.status(500).send(state.error);
    });
});

router.put('/access-point/connect', function(req, res){
  wifi.connectToAccessPoint(
    function(state){
      var result = {
        connectedNet: state.connectedNet,
        lastConnectionError: state.lastConnectionError
      }      
      res.status(200).send(result);
    },
    function(state){
      console.log("Error");
      console.log(state.error);      
      res.status(500).send(state.error);
    });
});

router.put('/:ssid', function(req, res){
  wifi.updateNetwork(req.body, 
    function(){
      res.status(200).send();
    },
    function(err){
      console.log("Error");
      console.log(err);
      res.status(500).send(err);
    });
});


router.delete('/:ssid', function(req, res){
  wifi.forgetNetwork(req.params.ssid, 
    function(){
      res.status(200).send();
    },
    function(err){
      console.log("Error");
      console.log(err);
      res.status(500).send(err);
    });
});

router.put('/:ssid/connect', function(req, res){
  wifi.connectToNet(req.params.ssid, 
    function(state){
      // error is used if an error occurs during normal connecting and 
      // the system reverts to ad-hoc
      var result = {
        connectedNet: state.connectedNet,
        lastConnectionError: state.lastConnectionError
      }      
      res.status(200).send(result);
    },
    function(state){
      console.log("Error");
      console.log(state.error);
      res.status(500).send(state.error);
    });
});

module.exports = router;
