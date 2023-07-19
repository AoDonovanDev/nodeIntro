const fs = require('fs')
const axios = require('axios')


let path = process.argv[2]

if(path.includes('.com')){
    webCat(path)
} else {
    cat(path)
}


function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log('error', err)
            process.kill(1)
        }
        console.log(data)
    })
}

async function webCat(path){
    const response = await axios.get(path)
        .catch(err => { console.log("oh no", err.code) })
    if(response){
        console.log(response.status, response.data)
    }
    
}