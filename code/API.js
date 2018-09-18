module.exports =
{
    GET_game_get: "/",
    GET_game_build: function(matchUrl)
    {
        if(matchUrl.indexOf("/Build") === 0)
            return true;
    },
    GET_game_templateData: function(matchUrl)
    {
        if(matchUrl.indexOf("/TemplateData") === 0)
            return true;
    },

    GET_Leaderboard_get: "/api/leaderboard/get",
    POST_Leaderboard_update: "/api/leaderboard/update"
};