module.exports = function(creep) {
    var structure = creep.pos.findNearest(Game.MY_STRUCTURES, {filter: function(structure){ return structure.structureType == "extension" && structure.energy < structure.energyCapacity; }});
    
    if(structure) {
        if(creep.energy === 0) {
            var spawn = creep.pos.findNearest(Game.MY_SPAWNS, {filter: function(spawn){ return spawn.energy > 0; }});
        
            if(spawn) {
                creep.moveTo(spawn);
                spawn.transferEnergy(creep);
            } 
        }  
        
        creep.moveTo(structure);
        creep.transferEnergy(structure);
    }
    require("flag")(creep);
};
