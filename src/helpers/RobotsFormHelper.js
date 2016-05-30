function getRobot(paramz){
  var bot = {name: "my bot", description: "does stuff"}
  if (paramz.id) {
    bot = {name: "bot #"+paramz.id, description:"todo: look this up!"} //TODO: database call
  }
  return bot
};

export {
  getRobot
}
