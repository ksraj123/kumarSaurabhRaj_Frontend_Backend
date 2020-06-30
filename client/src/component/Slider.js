import React from 'react';
import ReactSlider from 'react-slider';
import classes from './Slider.module.css';

export default (props) => <div>
    <p>Cofficient of Restitution (e)</p>
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
/></div>