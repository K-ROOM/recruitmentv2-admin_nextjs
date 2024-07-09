import { useState } from 'react';
import { MasterPositionToggle } from '../actions/actionMaster';

const ToggleSwitch = ({ onLabel = 'ON', offLabel = 'OFF', positionID, status }: any) => {
  const [isChecked, setIsChecked] = useState(status);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    MasterPositionToggle(positionID, !isChecked);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider"></span>
      {
        isChecked ?
        <>
            <span className="label on-label">
                {onLabel}
            </span>
        </>
        :
        <>
            <span className="label off-label">
                {offLabel}
            </span>
        </>
      }
      
    </label>
  );
};

export default ToggleSwitch;