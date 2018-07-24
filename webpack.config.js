module.exports = function getConfig(env){
  console.log('env=',env);
  return require('./build/webpack.' + env +'.js')(env);
}