function checkTime (req, res, next){

    const currentTime = new Date ().toLocaleDateString();
    console.log(`Ciao, sei passato dal Middleware il ${currentTime}. L'ora non t'interessa`)
    next();
    
}

module.exports = checkTime;