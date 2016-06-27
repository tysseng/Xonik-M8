// I don't really like this atm. because the actions are put in the shared folder. Maybe backend-only actions should live in core. 

// TODO: Load known networks from file and dispatch them to store via this action.

export const loadKnown = () => {
  return {
    type: 'NETWORK_LOAD_KNOWN_FROM_DISK',
    target: 'SERVER'
  }  
}