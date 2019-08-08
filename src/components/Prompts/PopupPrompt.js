import React from "react";
import PropTypes from 'prop-types';



function PopupPrompt(props) {
    const ShownComponent = props.component;
  return (
    <div className="popup-container">
      <div
        className="popup-overlay"
        onClick={() => props.showPopup(!props.activePopup)}
      />
      <div className="popup-card-container">
        <ShownComponent customProps = {props.componentProps}/>
      </div>
    </div>
  );
}

PopupPrompt.propTypes = {
    showPopup: PropTypes.func,
    activePopup: PropTypes.bool,
    component: PropTypes.func,
    componentProps: PropTypes.object
}

export default PopupPrompt;
