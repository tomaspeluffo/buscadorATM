import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {GoogleMap, Marker, InfoWindow} from '@react-google-maps/api'

import mapStyles from '../mapStyles'



// Se descarga y se requiere shortid para utilizar como keys unicas en React
const shortid = require('shortid');

const Mapa = ({red, obtenerData, guardarError, posicionInicial, guardarCajeros, cajeros}) => {


// Informacion de los puntos a mostrar en el mapa
const[punto, guardarPunto] = useState(null);


// Funcion que trae la data del backEnd
async function getData (){

    const params =  {red: red,
                    lat1: posicionInicial.latitude, 
                    lon1: posicionInicial.longitude }

    const data = await axios.post("http://localhost:8081/cajeros", params);

    guardarCajeros(data.data);

    if(data.data.length === 0){
        guardarError(true)
    }else{
        guardarError(false)
    }

};

useEffect(() => {

    if(obtenerData !== 0){
        getData()
    }

}, [obtenerData])


// Posicion del marker inicial
const center = {
        lat: posicionInicial.latitude,
        lng: posicionInicial.longitude
    }


// Const que cambia las configuraciones del mapa
    const options = {
        styles:mapStyles,
        disableDefaultUI:true,
        zoomControl: true,
    }


    const mapContainerStyle = {
        width: "100%",
        height: "400px",
    }


    return(

        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={16}
            center={center}
            options={options}

        > 

        {/*Marker de la posicion Inicial */}
        <Marker
        position={{lat:posicionInicial.latitude, lng:posicionInicial.longitude}}
        // icon={{
        //     url: 'usuarioMarker.svg',
        //     scaledSize: new window.google.maps.Size(25, 25),
        //     origin: new window.google.maps.Point(0, 0),

        //   }}  

            
        />

        {/* Marker de los cajeros que trae data.data  */}
        {cajeros.map(atm=>
        <Marker 
            key={shortid.generate()}
            position ={{lat:parseFloat(atm.lat), lng:parseFloat(atm.long)}}
            onClick={() => {
                guardarPunto(atm);
            }}   
            icon={{
                url: 'cajero.png',
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
    
              }}  
           
        />
        )}

        
        {/* Informacion que muestra al usuario al hacer click en un punto */}
       {punto ? (
        <InfoWindow 
            position={{lat: parseFloat(punto.lat), lng:parseFloat(punto.long)}}
            onCloseClick={() => {
                guardarPunto(null)
            }}
            >

           <div>
               <h4>{punto.banco}</h4>
               {punto.calle ? <h5>{punto.calle} {punto.altura} </h5> : null}    
               <p>Lat: {punto.lat}  Long: {punto.long}</p>  
           </div>
       </InfoWindow>)
       
        : null}

        </GoogleMap>
    )
     
}


 
export default Mapa;

