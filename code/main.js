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

    // set no cache
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.

    // process user requests
    if(req.method.toLocaleLowerCase() === "get")
    {
        // отдаем главную страницу
        if (req.url === API.GET_game_get)
            res.end(fs.readFileSync("../../build/index.html"));
           
        // отдаем билд и контент
        else if (API.GET_game_build(req.url) || API.GET_game_templateData(req.url))
            res.end(fs.readFileSync("../../build" + req.url));

        // отдаем лидерборду
        else if (req.url === API.GET_Leaderboard_get)
            res.end(leadboard.GetJSONString());

    }
    else if(req.method.toLowerCase() === "post")
    {
        // парсим новую запись и передаем ее на обработку в лидерборду
        if(req.url === API.POST_Leaderboard_update)
        {
            req.on("data", (chunk) => 
            {
                let data = chunk.toString() + "";
                let jsnUser = JSON.parse(data);
                
                if(jsnUser.name.length > 0 && jsnUser.score !== "")
                {
                    leadboard.AddUserObject(jsnUser);
                    leadboard.Save();
                }
            });
        }
    }
    
});
server.listen(port);

console.log("Server run at " + port);