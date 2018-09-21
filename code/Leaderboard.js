var fs = require("fs");
var UserScore = require("./UserScore");

module.exports = 
class Leaderboard
{
    constructor(strFilePath, maxSize)
    {
        console.log(strFilePath);

        this._strFilePath = strFilePath;
        this._jsnData = {};
        this._maxSize = maxSize;

        this._maxKey = 0;

        try {
            this._jsnData = JSON.parse(fs.readFileSync(strFilePath));
        } catch (err) {
            this._jsnData = { "leaderboard": [] };
            fs.writeFileSync(strFilePath, JSON.stringify(this._jsnData));

            console.log("new leaderboard.json created");
        }
    }

    AddUser(strName, numScore)
    {
        if(this._jsnData.leaderboard.length === 0)
            this._jsnData.leaderboard.push(new UserScore(this._maxKey, strName, numScore));

        for(let i = 0; i < this._jsnData.leaderboard.length; i++)
            if(numScore > this._jsnData.leaderboard[i].score)
            {
                this._jsnData.leaderboard.splice(i, 0, new UserScore(this._maxKey, strName, numScore));
                break;
            }
            else if(this._jsnData.leaderboard.leaderboard < this._maxSize)
                this._jsnData.leaderboard.push(new UserScore(this._maxKey, strName, numScore));

        this._maxKey++;

        this._jsnData.leaderboard.splice(this._maxSize, Math.abs(this._maxSize - this._jsnData.leaderboard.length));

        // this._jsnData.leaderboard.push( new UserScore(this._maxKey, strName, numScore));

        // let contains = false;
        // for (let i = 0; i < this._jsnData.leaderboard.length; i++) {
        //     let user = this._jsnData.leaderboard[i];
            
        //     if(user.name === strName)
        //     {
        //         contains = true;
        //         user.score = numScore;
        //         break;
        //     }
        // }

        // if(!contains && this._jsnData.leaderboard.length < this._maxSize)
        //     this._jsnData.leaderboard.push({ key: this._maxKey, name: strName, score: numScore });

        // this._maxKey++;
    }

    /**
     * 
     * @param {UserScore} objUser 
     */
    AddUserObject(objUser)
    {
        this.AddUser(objUser.name, objUser.score);
    }

    GetJSONString(){
        return JSON.stringify(this._jsnData);
    }

    Save()
    {
        fs.writeFileSync(this._strFilePath, JSON.stringify(this._jsnData));
    }

    /**
     * 
     * @param {number} index 
     * @returns {UserScore} userObject
     */
    GetUserByIndex(index)
    {
        return this._jsnData.leaderboard[index];
    }

    /**
     * 
     * @param {*} key 
     * @returns {UserScore}
     */
    GetUserByKey(key)
    {
        for(let i = 0; i < this._jsnData.leaderboard.length; i++)
            if(this._jsnData.leaderboard[i].key === key)
                return this._jsnData.leaderboard[i];
    }
}