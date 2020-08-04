import React, {useState} from 'react';
import Header from './componentes/Header'
import Formulario from './componentes/Formulario';
import Mapa from './componentes/Mapa';
import Error from './componentes/Error';
import Buscador from './componentes/Buscador';


function App() {
  const[red, guardarRed] = useState("BANELCO")
  const[cajeros, guardarCajeros] = useState([]);
  const[obtenerData, guardarObtenerData] = useState(0);
  const[error, guardarError] = useState(false)
  const[posicionInicial, guardarPosicionInicial] =useState({
    latitude:-34.608223, 
    longitude:-58.369848
  })


  return (
    <div className="superContendor">
      <Header 
        titulo = "Buscador ATM"
      />

      <div className="container" >
        <div className="row">
            <div className="col-lg">

                {error?<Error  mensaje="No se encontraron cajeros a menos de 500mts"/> : null }

                <Buscador 
                guardarPosicionInicial={guardarPosicionInicial}
                posicionInicial={posicionInicial}
                guardarCajeros={guardarCajeros}
                
              />
                <Formulario 
                guardarRed={guardarRed}
                guardarObtenerData={guardarObtenerData}
                obtenerData={obtenerData}
            
                />

            </div>


            <div className="col-lg">
                <Mapa
                  red={red}
                  obtenerData={obtenerData}
                  guardarError={guardarError}
                  posicionInicial={posicionInicial}
                  cajeros={cajeros}
                  guardarCajeros={guardarCajeros}
                />
            </div>
        </div>
        
      </div>

    </div>
  );
}

export default App;
