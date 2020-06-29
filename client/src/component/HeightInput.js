import React from 'react';

export default (props) => {
    return(
        <div className="HeightInput">
            <p>Adjust Height of drop</p>
            <form onSubmit={props.setHeight}>
                <input name="height" type="text" defaultValue={props.val} />
                <button>Set</button>
            </form>
        </div>
    );
}