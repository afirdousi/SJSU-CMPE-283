var express = require("express");
var app = express();

var Keystone = require("openclient").getAPI('openstack', 'identity', '2.0');
console.log("Keystone:");
console.log("**************");
console.log(Keystone);


var client = new Keystone({
  url: "http://10.0.0.11:5000/v2.0",
  debug: true
});



app.get('/',function(req,res){
  console.log("testing server is working fine on terminal...");
  res.send("testing server is working fine on browser...");
}); 

app.get('/updateproject',function (req,res) {
  console.log("/updateproject called ....");

    client.authenticate({
      username: "admin",
      password: "admin_user_secret",
      project: "admin"
    // Callbacks can either be success/error handlers in the options object or
    // a callback function as the last argument.
    }, function (err, token) {

    console.log("####Client authenticated....####");
    client.projects.all({
      endpoint_type: "adminURL",  // Defaults to "publicURL".

      // Callbacks receive the result of the call;
      success: function (projects) {

        console.log("111111111");
        var updated_project, project = projects[0];
        client.projects.update({
          endpoint_type: "adminURL",
          id: project.id,
          data: {
            name: "my new project 123"
          },
          success: function (updated_project) {
            console.log("22222222");
            updated_project.name === "my new project 123";  // true
          },
          error: function (err) {
            console.error(err);
          }
        });
      },
      error: function (err) {
        console.error(err);
      }
    });
  },function(){

      console.log("####Client authentication failed....####");
      res.send("####Client authentication failed....####");

  });


});


app.listen(3000, function(){
  console.log("Server happily running on 3000...");
});






