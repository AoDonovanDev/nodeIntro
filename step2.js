const fs = require('fs')
let path = process.argv[2]
cat(path)
function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log('error', err)
            process.kill(1)
        }
        console.log(data)
    })
}