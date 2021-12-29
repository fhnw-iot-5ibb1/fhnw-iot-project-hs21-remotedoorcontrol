import React, { useState } from "react";
import PropTypes from "prop-types";
import './DoorSwitch.scss';
import { useSpring, animated as a } from "react-spring";

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function.
The props name, small, disabled and optionLabels are optional.
Usage: <ToggleSwitch id="id" checked={value} onChange={checked => setValue(checked)}} />
*/

const DoorSwitch = ({ id, name, checked, onChange, optionLabels, small, disabled }) => {
 
  return(            
      <div className="curtain">
        <div className="curtain__wrapper">
        <input
                type="checkbox"
                name={name}
                className="door-switch-checkbox"
                id={id}
                checked={checked}
                onChange={e => onChange(e.target.checked)}
                disabled={disabled}
            />
          
          <div className="curtain__panel curtain__panel--left">
            <h1>Click to open </h1>
          </div>
          
          <div className="curtain__content">
          <img src="froggo.png"/>
            <h2>Door Unlocked!</h2>
          </div>
          
          <div className="curtain__panel curtain__panel--right">
            <h1>&nbsp; the door</h1>
          </div>          
        </div> 
      </div>

    );   
}


// Set optionLabels for rendering.
DoorSwitch.defaultProps = {
    optionLabels: ["Open", "Close"],
};

DoorSwitch.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    optionLabels: PropTypes.array,
    small: PropTypes.bool,
    disabled: PropTypes.bool
};

export default DoorSwitch;