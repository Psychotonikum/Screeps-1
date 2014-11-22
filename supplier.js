module.exports = function(creep) {
    var spawn;
    
    var structure = creep.pos.findNearest(Game.MY_STRUCTURES, {filter: function(structure){ return structure.structureType == "extension" && structure.energy < structure.energyCapacity; }});

    if(structure) {
        if(creep.energy === 0) {
            spawn = creep.pos.findNearest(Game.MY_SPAWNS, {filter: function(spawn){ return spawn.energy > 0; }});

            if(spawn) {
                creep.moveTo(spawn);
                spawn.transferEnergy(creep);
            } 
        } else {
            creep.moveTo(structure);
            creep.transferEnergy(structure);
        }
    } else if(creep.energy > 0) {
        spawn = creep.pos.findNearest(Game.MY_SPAWNS, {filter: function(spawn){ return spawn.energy < spawn.energyCapacity - creep.energy; }});

        if(spawn) {
            creep.moveTo(spawn);
            creep.transferEnergy(spawn);
        } 
    } else require("flag")(creep);
};
