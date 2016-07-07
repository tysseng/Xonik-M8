import {panelControllers} from '../../../shared/matrix/PanelControllers.js';

const PanelControllerDropdown = ({value, onControllerChange}) => (

  <select value={value} onChange={(e) => (onControllerChange(e.target.value))}>
    {panelControllers.map(controller => {
      return <option key={controller.id} value={controller.id}>{controller.name.full}</option>
    })}
  </select>
)

export default PanelControllerDropdown;