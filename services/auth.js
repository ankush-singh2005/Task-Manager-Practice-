const sessionIdUserToMap = new Map();

const setUser = function(sessionId,user){
    sessionIdUserToMap.set(sessionId,user);
}

const getUser = function(sessionId){
    const user = sessionIdUserToMap.get(sessionId);
    console.log('getUser for sessionId:', sessionId, 'returns:', user);
    return user;
}

module.exports = {
    setUser,
    getUser
}