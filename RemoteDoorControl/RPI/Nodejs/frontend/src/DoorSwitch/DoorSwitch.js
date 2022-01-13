import React from "react";
import PropTypes from "prop-types";
import './DoorSwitch.scss';

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function.
The props name, small, disabled and optionLabels are optional.
Usage: <ToggleSwitch id="id" checked={value} onChange={checked => setValue(checked)}} />
*/

const DoorSwitch = ({ id, name, checked, onChange, optionLabels, small, disabled }) => {
 
  return(            
    <div className={"door-switch" + (small ? " small-switch" : "")}>
    <input
        type="checkbox"
        name={name}
        className="door-switch-checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
    />
    {id ? (
        <label className="door-switch-label" htmlFor={id}>
            <span
                className={
                    disabled
                        ? "door-switch-inner door-switch-disabled"
                        : "door-switch-inner"
                }
                data-yes={optionLabels[0]}
                data-no={optionLabels[1]}
            />
            <span
                className={
                    disabled
                        ? "door-switch-switch door-switch-disabled"
                        : "door-switch-switch"
                }
            />
        </label>
    ) : null}
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