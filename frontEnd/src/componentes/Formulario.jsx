import React, { useState} from 'react';
import Error from './Error';

import ReCAPTCHA from "react-google-recaptcha";


const Formularios = ({ guardarRed, guardarObtenerData, obtenerData}) => {


    const[verificado, guardarVerificado] = useState(null)
    const[error, guardarError] = useState(false)


    // Evento que modifica el state de verficado. Esto se utiliza para comprobar si el usuario completo el Captcha
    function onChange(value) {
        guardarVerificado(value);
          }


    // Evento que corrobora que el state de verificado haya cambiado. De no ser asi no se podra realizar una busqueda. Una vez que se haya completao del captcha el usuario podra buscar y ademas desaparece el mensaje de error. 
    function handleSubmit(e){
        e.preventDefault();

        if(verificado != null ){
            guardarObtenerData(obtenerData+1)
            guardarError(false)
        }else{
            guardarError(true);
        }
    }


    return ( 

        <form
            onSubmit= {handleSubmit}
        >
          <div className="col">

        <div className="container d-flex ">

            </div>

                <div className="radio col-md-6 ">
                    <h2 className="h3" >Elija la red</h2>
                <label className="h4 mx-3">
                    <input className="mx-2"  type="radio" value="BANELCO" name="bank" defaultChecked={true} onChange={e => guardarRed(e.target.value)} />
                    Banelco 
                </label>
                </div>
                
                <div className="radio col-md-6">
                <label className="h4 mx-3">
                    <input className="mx-2" type="radio" value="LINK" name="bank" onChange={e => guardarRed(e.target.value)} />
                    Link
                </label>
                </div>  

                <div className="text_center mt-3 ">
                
                </div>

 
                <div className="form-group col-md-12 text-center mt-2 text_center">
                    {error ? <Error mensaje="Por favor complete el captcha"/>: null}

                    <ReCAPTCHA
                        sitekey="6LfwvLMZAAAAAAygLnSW7k-r0AG7mnQ9RS7tgApJ"
                        onChange={onChange}
                    />

                    <input 
                        type="submit"
                        className="btn btn-lg btn-primary btn-block mt-3" 
                        value="Buscar"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formularios;