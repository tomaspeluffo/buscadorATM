import React from 'react'

const Error = ({mensaje}) => {
    return (
        <p className="alert alert-warning">{mensaje}</p>
     );
}
 
export default Error;