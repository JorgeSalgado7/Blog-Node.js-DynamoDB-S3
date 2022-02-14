/**
 * CREATE APPLICATION FOLDER BY CLI
 * 
 * @AUTHOR JORGE SALGADO
 * @URLAUTHOR https://jorgesalgado.com.mx
 * 
 * @LICENSE ISC
 * 
 * @DOCUMENTATION AT 
 * URL
 * 
 * 
*/

const{ argv } = require('process')
const fs = require('fs')

//IF DIRECTORY EXITS
if(fs.existsSync(argv[2])){
    console.log('Directory already created')
}

//CREATE DIRECTORY IF NOT EXISTS
else{

    //MAIN
    fs.mkdir(argv[2], (error) => {
        if(error) return console.log(error.message)
        console.log('Directory created')
    })

    //VIEWS
    fs.mkdir(`${argv[2]}/views` , { recursive: true }, (error) => {
        if(error) return console.log(error.message)
        console.log('Directory /views created')

        //CREATE CRUD FILES ONLY IF EXISTS A SECOND PARAM
        if(argv[3] === 'crud'){

            fs.writeFile(`${argv[2]}/views/create.js`, '', (error) => {
                if(error) return console.log(error.message)
                console.log('File create.js created')
            })
        
            fs.writeFile(`${argv[2]}/views/get.js`, '', (error) => {
                if(error) return console.log(error.message)
                console.log('File get.js created')
            })
        
            fs.writeFile(`${argv[2]}/views/getOne.js`, '', (error) => {
                if(error) return console.log(error.message)
                console.log('File getOne.js created')
            })
        
            fs.writeFile(`${argv[2]}/views/update.js`, '', (error) => {
                if(error) return console.log(error.message)
                console.log('File update.js created')
            })
        
            fs.writeFile(`${argv[2]}/views/delete.js`, '', (error) => {
                if(error) return console.log(error.message)
                console.log('File delete.js created')
            })

        }

    })

    //VALIDATORS
    fs.mkdir(`${argv[2]}/validator`, { recursive: true }, (error) => {
        if(error) return console.log(error.message)
        console.log('Directory /validator created')
    })

    //UTILS
    fs.mkdir(`${argv[2]}/utils`, { recursive: true }, (error) => {
        if(error) return console.log(error.message)
        console.log('Directory /validator created')
    })

    //URLS
    fs.writeFile(`${argv[2]}/urls.js`, '', (error) => {
        if(error) return console.log(error.message)
        console.log('File urls.js created')
    })

}

