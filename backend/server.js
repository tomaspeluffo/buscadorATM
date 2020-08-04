//Paquetes necesarios para el proyecto
const express = require("express");
const bodyParser = require("body-parser");
const CSVToJSON = require('csvtojson');


var app = express();

app.use(bodyParser.urlencoded({
  extended: true
  
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.post("/cajeros", (req, res) =>{

  CSVToJSON().fromFile("./cajeros-automaticos.csv").then(cajero =>{  
  
    let stringified = JSON.stringify(cajero);

    // Todos los cajeros de listado

    let cajeros = JSON.parse(stringified);

    let red = req.body.red;
    let lat1 = req.body.lat1;
    let lon1 = req.body.lon1;


     // Se filtran los cajeros de acuerdo a la red

     let cajeroRed = cajeros.filter(function (elements) {
      return elements.red === red
    });


    // Formula para calular la distancia entre 2 puntos. https://reviblog.net/2016/01/08/javascript-obtener-la-distancia-distancia-en-kilometros-entre-dos-puntos-dadas-por-su-latitud-y-longitud/
    
    function calcularDistancia(lat1, lon1, lat2, lon2){
    
        var R = 6378.137; //Radio de la tierra en km
        var dLat = ((lat2 - lat1)*Math.PI/180 );
        var dLong = ((lon2 - lon1) *Math.PI/180);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos((lat1*Math.PI/180)) * Math.cos((lat2*Math.PI/180)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
      return d.toFixed(3); //Retorna tres decimales
    }


    // Se le agrega una porpiedad a los cajeros que es la distancia hacia el punto que requerimos como parametro al front
    cajeroRed.forEach(element => {
      element.distancia = calcularDistancia(lat1, lon1, element.lat, element.long)  

    })

    let cajeroOrdenado = []

    // Por cada uno de los cajeros se selecionan aquellos que se encuentran a menos de 500 metros 

    for (let i = 0; i < cajeroRed.length; i++) {
        if(cajeroRed[i].distancia < 0.5 ){
          cajeroOrdenado.push(cajeroRed[i])
        }
    }

    // Se ordenanan los cajeros de forma ascendente de acuerdo a la distancia que se encuentren
     const cajerosMenorDistancia=  cajeroOrdenado.sort((a, b) => {
      return a.distancia-b.distancia
    })

    // De los cajeros solo se selecionan 3 y se envian al front para que los muestre

    let cajerosCercanos= cajerosMenorDistancia.slice(0,3);

   
  
    res.json(cajerosCercanos)

  })
} )


//Seteamos el puerto en el cual va a escuchar los pedidos la aplicación
let puerto = "8081";

app.listen(8081, function () {
  console.log("Escuchando en el puerto " + puerto);
});



