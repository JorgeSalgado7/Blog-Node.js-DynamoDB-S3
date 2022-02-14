const GET = async (req, res) => {

    const { authorization } = req.headers

    const patron = new RegExp(/[a-eA-z0-5]/, 'g')

    if((authorization.length === 15) && patron.test(authorization) === true){

        res.status(200).json({
            imagen: 'https://licorne.mx/img/home/Mini-albya.jpg',
            nombre: 'Licorne',
            descripcion: 'Startup Kings',
            endpoint: 'https://licorne.mx'
        })

    }

    else{

        res.status(400).json({
            error: 'El formato de tu token es inválido'
        })

    }

    
}


module.exports = GET