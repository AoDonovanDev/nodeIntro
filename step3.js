const fs = require('fs')
const axios = require('axios')


let path
let [npath, fpath, option, output, input] = process.argv

if(!output){
    path = option
}
if(output&&input){
    path = input
}


if(path.includes('.com')){
    webCat(path, option, output)
} else {
    cat(path, option, output)
}


function cat(path, opt, out){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log('error', err)
            process.kill(1)
        }
        if(opt === '--out'){
            fs.writeFile(output, data, 'utf8', function(err){
                if(err){
                    console.log('oops', err)
                }
                console.log('success')
            })
        }
        console.log(data)
    })
}

async function webCat(path, opt, out){
    const response = await axios.get(path)
        .catch(err => { console.log("oh no", err.code) })
    if(response){
        console.log(response.status, response.data)
        if(opt === '--out'){
            fs.writeFile(output, response.data, 'utf8', function(err){
                if(err){
                    console.log('oh no', err)
                }
                console.log('success')
            })
        }
    }
    
}