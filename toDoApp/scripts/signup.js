window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    const inputNombre = document.querySelector("#inputNombre")
    const inputApellido = document.querySelector("#inputApellido")
    const inputEmail = document.querySelector("#inputEmail")
    const inputPassword = document.querySelector("#inputPassword")
    const inputPasswordRepetida = document.querySelector("#inputPasswordRepetida")
    const URL = "https://todo-api.ctd.academy/v1"
    const path = "/users"
    const URI = URL + path
    const tarjeta= document.getElementById("tarjetaError");


    // Aquí en este punto yo me encargo de mandar a llamar las funciones de normalizar texto y validaciónes

    inputNombre.addEventListener("blur", e => isEmpty(`⚠️ Se requiere que ingrese su ${inputNombre.name}`, e))
    inputApellido.addEventListener("blur", e => isEmpty(`⚠️ Se requiere que ingrese su ${inputApellido.name}`, e))
    inputEmail.addEventListener("blur", e => isEmpty(`⚠️ Se requiere que ingrese su ${inputEmail.name}`, e))
    inputPassword.addEventListener("blur", e => isEmpty(`⚠️ Se requiere que ingrese su ${inputPassword.name}`, e))
    inputPasswordRepetida.addEventListener("blur", e => isEmpty(`⚠️ Se requiere que ingrese su ${inputPassword.name}`, e))



    inputEmail.addEventListener("input", validarEmail)
    inputPassword.addEventListener("input", validarContrasenia)
    //inputPasswordRepetida.addEventListener("input", compararContrasenias)


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()
       
        //   Creamos el cuerpo de la request
        const payload = {
            firstName: inputNombre.value,
            lastName: inputApellido.value,
            email: inputEmail.value,
            password: inputPassword.value
        }
        // Configuramos la request del fetch
        const settings = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(payload)
        }


        if (payload.password !== inputPasswordRepetida.value) {
           tarjeta.innerHTML= "Las contraseñas no coinciden, escribalas nuevamente"
           tarjeta.classList.add('error')
           return;
        }

      // Lanzamos la consulta de loguin a la API
      realizarRegister(settings)

      // Limpio los campos del formulario
      form.reset();
  });

        

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        console.log("Lanzando la consulta a la API");
        fetch(URI, settings)
            .then(response => {
                // console.log(response);
                return response.json()
            }) // response me devuelve el jwt
            .then(resJSON => {
                console.log(resJSON)
                // console.log(responseJSON);
                if (resJSON.jwt) {
                    localStorage.setItem("jwt", resJSON.jwt) // guardo mi token en el localStorage
                    location.replace("mis-tareas.html") // veo si logeo y me redirije a nuestro tablero
                }
            })
            .catch(err => console.log(err))
    };
});
