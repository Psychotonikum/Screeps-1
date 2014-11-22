module.exports = function(creep) {
    var enemy = creep.pos.findNearest(Game.HOSTILE_CREEPS);
//    if(enemy)
    
    require("flag")(creep);
};