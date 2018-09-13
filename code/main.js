var http = require("http");
var port = process.env.PORT || 3000;

var fs = require("fs");

var API = require("./API");
var Leaderboard = require("./Leaderboard");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var leadboard = new Leaderboard("../db/leaderboard.json", 100);

var server = http.createServer((req, res) => 
{
    console.log(req.method.toUpperCase() + " "  + req.url);

    // set CORS flags
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");

    // process user request

    // на гет - выплевываем всю лидерборду
    if(req.method.toLocaleLowerCase() === "get")
    {
        if(req.url === API.GET_Leaderboard_get)
            res.end(leadboard.GetJSONString());
    }
    // на пост - парсим новую запись и передаем ее на обработку в лидерборду
    else if(req.method.toLowerCase() === "post")
    {
        if(req.url === API.POST_Leaderboard_update)
        {
            req.on("data", (chunk) => 
            {
                let data = chunk.toString() + "";
                let jsnUser = JSON.parse(data);
                
                if(jsnUser.name.length > 0 && jsnUser.score !== "")
                {
                    leadboard.SetUserObject(jsnUser);
                    leadboard.Save();
                }
            });
        }
    }
    
});
server.listen(port);

console.log("Server run at " + port);