import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { SpotifyContainer } from './components'

const useStyles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20
  },
  cameraContainer: {
    flex: 1
  },
  spotify: {
    flex: 1
  }
})

function App() {
  const classes = useStyles();
  

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.cameraContainer}>

        </div>

        <div className={classes.spotify}>
          <SpotifyContainer />  
        </div> 
      </div>
    </div>
  );
}

export default App;
