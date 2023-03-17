function getSessionData(req){
    const sessionData = req.session.flashedData;
    req.flashedData = null;
    return sessionData;
}

function flashDataToSession(req, data, action){
    req.session.flashedData = data;
    req.session.save(action);
}

module.exports = {
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession
}