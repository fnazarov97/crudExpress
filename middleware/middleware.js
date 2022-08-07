//LOGGER
const LoggerMiddeware = (req, res, next) => {
    let d = new Date,
        dformat = [d.getDate(),
        d.getMonth() + 1,
        d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
    next()
    let diff = new Date() - d
    console.log(`--------> ${dformat} | ${req.method}: ${req.url} | ${diff} ms`)
}

//AUTHORIZATION
const secretKey = 'topolmaysan'
function Auth(req, res, next){
    let key = req.headers['authorization']
    if(key == secretKey){
        next()
        return
    }
    res.status(401).send('Unauthorized!') 
}

module.exports = {LoggerMiddeware, Auth}