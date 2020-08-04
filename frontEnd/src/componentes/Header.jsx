import React from 'react'

const Header = ({titulo}) => {
    return ( 
        <div className= "jumbotron">
            <h1 className="text-center display-4 font-weight-bold">{titulo}</h1>         

        </div>
     );
}
 
export default Header;