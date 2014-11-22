var _ = require("lodash");

//var marksman = require("marksman");
//var supplier = require("supplier");
var worker = require("worker");

var util = require("util");

var ROLES = {
    //"marksman": [5, [Game.HEAL, Game.RANGED_ATTACK, Game.MOVE, Game.MOVE]],
    //"supplier": [2, [Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE]],
    "worker": [10, [Game.CARRY, Game.WORK, Game.MOVE, Game.MOVE]],
    
};

for(var role in ROLES) {
    var delta = ROLES[role][0] - util.count(role);
    
    if(delta < 1) continue;
    
    for (var i = 0; i < delta; i++) {
        var spawn = util.spawn();
        if(spawn) {
            var newName = spawn.createCreep(ROLES[role][1]);
            if(typeof(newName) == "string") Memory.creeps[newName].role = role;
        } else break;
    }
}

for(var creepName in Game.creeps) {
    var creep = Game.creeps[creepName];
    
    switch(creep.memory.role) {
        /*case "marksman": {
            marksman(creep);
            break;
        }*/
        case "worker": {
            worker(creep);
            break;
        }        
        /*case "supplier": {
            supplier(creep);
            break;
        }*/
        default:
        {
            creep.memory.role = "worker";
        }
    }
}
