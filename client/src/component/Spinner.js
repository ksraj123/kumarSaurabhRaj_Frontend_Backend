import React from 'react';
import classes from './Spinner.module.css';
import LoadingOverlay from 'react-loading-overlay';

const Spinner = () => (
  <div className={classes.Spinner}>
  <LoadingOverlay
    active
    styles={{
      wrapper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}}
    spinner
    text='Fetching Data...'
    >
    {/* <p>Some content or children or something.</p> */}
  </LoadingOverlay>
  </div>
)

export default Spinner