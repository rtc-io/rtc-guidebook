var guidebook = require('guidebook');
var port = parseInt(process.env.NODE_PORT, 10) || 3000;

guidebook({}, function(err, server, cdn) {
  var switchboard;

  if (err) {
    return console.error('could not create guidebook: ', err);
  }

  // add the switchboard to our server
  switchboard = require('rtc-switchboard')(server);

  // serve the primus client
  cdn.app.get('/rtc.io/primus.js', switchboard.library());

  // start the server
  server.listen(port, function(err) {
    if (err) {
      return console.error('Could not bind to port: ' + port, err);
    }

    console.log('running rtc-guidebook at http://localhost:' + port + '/guidebook/');
  });
});
