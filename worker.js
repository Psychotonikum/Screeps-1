var util = require("util");
var flag = require("flag");

module.exports = function(creep) {
    var source, spawn, constrSite, target;
    if(creep.energy < creep.energyCapacity && !Memory.creeps[creep.name].deplete) {
        source = creep.pos.findNearest(Game.SOURCES_ACTIVE);
        spawn = creep.pos.findNearest(Game.MY_SPAWNS, { filter: function(spawn) { return spawn.energy > 0; } });
        
        target = util.decide(creep, source, spawn);

        if(target) {
            if(target == spawn && spawn.energy >= 3000 + creep.energyCapacity) {
                creep.moveTo(spawn);
                spawn.transferEnergy(creep);
            } else {
                creep.moveTo(source);
                creep.harvest(source);
            } 
        } else flag(creep);
    } else {
        Memory.creeps[creep.name].deplete = true;

        spawn = creep.pos.findNearest(Game.MY_SPAWNS, { filter: function(spawn) { return spawn.energy <= spawn.energyCapacity - creep.energy; } });
        constrSite = creep.pos.findNearest(Game.CONSTRUCTION_SITES);

        target = util.decide(spawn, constrSite);

        if(spawn && (target == spawn || (spawn.energy < 3000 && (spawn.memory.supplier == creep.name || !spawn.memory.supplier)))) {
            spawn.memory.supplier = creep.name;
            creep.moveTo(spawn);
            if(creep.transferEnergy(spawn) === 0) spawn.memory.supplier = null;
        } else if(constrSite) {
            creep.moveTo(constrSite);
            creep.build(constrSite);
            
        } else flag(creep); 
        
        resetDeplete(creep);
    }

    function resetDeplete(creep) {
        if(creep.energy === 0) Memory.creeps[creep.name].deplete = false;
    }
};
