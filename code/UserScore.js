module.exports = 
class UserScore
{
    constructor(key, name, score)
    {
        this.key = key? key : 0;
        this.name = name? name : "";
        this.score = score? score : 0.0;
    }
    
}