import React from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'



import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxPopover,
  } from "@reach/combobox";

  import "@reach/combobox/styles.css";


const shortid = require('shortid');


const Buscador = ({guardarPosicionInicial, posicionInicial}) => {


    const {ready, value, suggestions:{status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions:{
            location:{lat: () => -posicionInicial.latitude, lng: () => posicionInicial.longitude},
            radius: 500,
        }
    })

// Funcion que al hacer click nos posiciona en nuestra ubicacion actual. 
    function localizaPosicion(){

        navigator.geolocation.getCurrentPosition(function(position) {
    
            guardarPosicionInicial(position.coords)
          });

    }


// Evento que setea el value de usePlacesAutocomplete
    const handleInput = (e) => {
        setValue(e.target.value);
      };


// Evento que nos posiciona en las coordenadas de la direccion selecionada que nos recomienda google places

      const handleSelect = async (address) => {
        setValue(address);
        clearSuggestions();
    
        try {
          const results = await getGeocode({ address });
          const resultados = await getLatLng(results[0]);
          
          const pasarResultado = {
              latitude: resultados.lat,
              longitude : resultados.lng
          }

          guardarPosicionInicial(pasarResultado)

        } catch (error) {
          console.log(" Error: ", error);
        }
      };

  
    return (  
     
        <div className="container d-flex p-2">

            <Combobox 
                className="form-group col-md-8 mt-0 mb-1 pb-1"
                onSelect={handleSelect}
            >
                <ComboboxInput 
                    value={value}
                    className=" form-control form-control-lg "
                    placeholder="Ingrese se ubicación"
                    onChange = {handleInput}
                    disabled = {!ready}
                />

                <ComboboxPopover>
                    {status === "OK" && 
                        data.map(({id, description}) => 
                    <ComboboxOption 
                        key={shortid.generate()}
                        value={description}
                    />)}
                </ComboboxPopover>
            </Combobox>

            <div className="form-group col-md-4 text-center mt-0">
                <input 
                    className="btn btn-lg btn-primary btn-block " 
                    value="Localizame"
                    type="button"
                    onClick={localizaPosicion}

                />
            </div>

        </div>
        
    );
}
 
export default Buscador;



