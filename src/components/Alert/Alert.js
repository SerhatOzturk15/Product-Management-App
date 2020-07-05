import React from 'react';
import {default as AlertComp} from "react-bootstrap/Alert";

const Alert = ({text, type}) => {


    return (  <AlertComp style ={{position: 'fixed', right: '10px', bottom: '10px'}}  variant={type}>
        {text}
      </AlertComp>)
}


export default Alert;