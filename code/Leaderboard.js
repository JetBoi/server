var fs = require("fs");

module.exports = 
class Leaderboard
{
    constructor(strFilePath, maxSize)
    {
        console.log(strFilePath);

        this._strFilePath = strFilePath;
        this._jsnData = {};
        this._maxSize = maxSize;

        try {
            this._jsnData = JSON.parse(fs.readFileSync(strFilePath));
        } catch (err) {
            this._jsnData = { "leaderboard": [] };
            fs.writeFileSync(strFilePath, JSON.stringify(this._jsnData));

            console.log("new leaderboard.json created");
        }
    }

    SetUser(strName, numScore)
    {
        let contains = false;
        for (let i = 0; i < this._jsnData.leaderboard.length; i++) {
            let user = this._jsnData.leaderboard[i];
            
            if(user.name === strName)
            {
                contains = true;
                user.score = numScore;
                break;
            }
        }

        if(!contains && this._jsnData.leaderboard.length < this._maxSize)
            this._jsnData.leaderboard.push({ "name":strName, "score":numScore });
    }
    SetUserObject(objUser)
    {
        this.SetUser(objUser.name, objUser.score);
    }

    GetJSONString(){
        return JSON.stringify(this._jsnData);
    }

    Save()
    {
        fs.writeFileSync(this._strFilePath, JSON.stringify(this._jsnData));
    }
}