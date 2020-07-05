import React from 'react';
import {default as AlertComp} from "react-bootstrap/Alert";

const Alert = ({text}) => {


    return (  <AlertComp style ={{position: 'fixed', right: '10px', bottom: '10px'}}  variant={'danger'}>
        {text}
      </AlertComp>)
}


export default Alert;