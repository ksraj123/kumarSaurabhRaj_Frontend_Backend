import React from 'react';
import ReactSlider from 'react-slider';
import classes from './Slider.module.css';

export default (props) => <React.Fragment>
    <p>Slide to adjsut cofficient of restitution</p>
    <ReactSlider
    max={1}
    min={0}
    minDistance={0.1}
    step={0.05}
    value={props.val}
    onAfterChange={props.onChange}
    className={classes.Slider}
    thumbClassName={classes.thumb}
    trackClassName={classes.track}
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
/></React.Fragment>