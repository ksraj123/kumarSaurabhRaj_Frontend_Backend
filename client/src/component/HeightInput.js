import React from 'react';

export default (props) => {
    return(
        <div className="HeightInput">
            <p>Height of Drop (H)</p>
            <form onSubmit={props.setHeight}>
                <input name="height" type="text" defaultValue={props.val} />
                <button>Set</button>
            </form>
        </div>
    );
}