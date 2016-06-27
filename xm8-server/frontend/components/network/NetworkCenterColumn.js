import React from 'react';

const NetworkCenterColumn = ({currentNetwork, builtInNetwork, knownNetworks, availableNetworks}) => {

  return ( 
    <div>
      <div>
        <h2>Current network</h2>
        <div>{currentNetwork.no}</div>
      </div>
      <div>
        <h2>Built-in network</h2>
        <div>{builtInNetwork.no}</div>
      </div>
      <div>
        <h2>Known networks</h2>
        <div>
        {
          knownNetworks.map(net => {
            return <div>A network</div>;
          })
        }
        </div>
      </div>       
      <div>
        <h2>Available networks</h2>
        <div>
        {
          availableNetworks.map(net => {
            return <div>A network</div>
          })
        }
        </div>
      </div>      
            
    </div>
  )

}

export default NetworkCenterColumn;