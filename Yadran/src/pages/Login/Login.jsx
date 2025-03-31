import React from 'react'
import FormularioInicioSesion from '../../components/auth/FormularioLogin'
import Header from '../../components/header/Header'

function Login() {
    return (
        <>
            {/* <Header /> */}
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <FormularioInicioSesion />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login