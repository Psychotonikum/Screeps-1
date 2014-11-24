var flag = require("flag");

module.exports = {
    "miner": [5, [Game.MOVE, Game.MOVE, Game.WORK, Game.WORK, Game.WORK], 
        function(creep) {
            var source = creep.room.findNearest(Game.SOURCES_ACTIVE);
            if (source) {
                creep.moveTo(source);
                creep.harvest(source);
            }
        }
    ],
    "carrier": [5, [Game.MOVE, Game.MOVE, Game.CARRY, Game.CARRY, Game.CARRY],
        function(creep) {
            var coop;
            
            if(creep.memory.coop) {
                      
            } else
               coop = creep.rom.findNearest(Game.MY_CREEPS, {filter: function(creep) { return creep.memory.role == "miner" && !creep.memory.coop; }});
                if(coop) {
                   coop.memory.coop = creep;
                   creep.memory.coop = coop;
                } else console.log("No coop miner found!");
            }
    ],
    /*"miner": [5, [Game.MOVE, Game.MOVE, Game.CARRY, Game.CARRY, Game.WORK],
        function(creep) {
            if (creep.energy == creep.energyCapacity) {
                var spawn = creep.pos.findNearest(Game.MY_SPAWNS, {
                    filter: function(spawn) {
                        return spawn.energy < spawn.energyCapacity;
                    }
                });
                if (spawn) {
                    creep.moveTo(spawn);
                    creep.transferEnergy(spawn);
                } else {
                    var ext = creep.pos.findNearest(Game.MY_STRUCTURES, {
                        filter: function(structure) {
                            return structure.structureType == "extension" && structure.energy < structure.energyCapacity;
                        }
                    });
                    if (ext) {
                        creep.moveTo(ext);
                        creep.transferEnergy(ext);
                    } else flag(creep);
                }
            } else {
                var source = creep.pos.findNearest(Game.SOURCES_ACTIVE);
                if (source) {
                    creep.moveTo(source);
                    creep.harvest(source);
                }
            }
        }
    ],*/
    "builder": [2, [Game.MOVE, Game.MOVE, Game.CARRY, Game.CARRY, Game.WORK],
        function(creep) {
            if (creep.energy === 0 || creep.memory.mode == "refill") {
                creep.memory.mode = "refill";

                var spawn = creep.pos.findNearest(Game.MY_SPAWNS, {
                    filter: function(spawn) {
                        return spawn.energy > 0;
                    }
                });

                if (spawn) {
                    creep.moveTo(spawn);

                    if (spawn.transferEnergy(creep) == Game.ERR_FULL) creep.memory.mode = null;
                } else flag(creep);
            } else {
                var site = creep.pos.findNearest(Game.CONSTRUCTION_SITES);
                if (site) {
                    creep.moveTo(site);
                    creep.build(site);
                } else flag(creep);
            }
        }
    ],
    "repairer": [3, [Game.MOVE, Game.MOVE, Game.CARRY, Game.CARRY, Game.WORK],
        function(creep) {
            if (creep.energy === 0 || creep.memory.mode == "refill") {
                creep.memory.mode = "refill";

                var spawn = creep.pos.findNearest(Game.MY_SPAWNS, {
                    filter: function(spawn) {
                        return spawn.energy > 0;
                    }
                });

                if (spawn) {
                    creep.moveTo(spawn);

                    if (spawn.transferEnergy(creep) == Game.ERR_FULL) creep.memory.mode = null;
                } else flag(creep);
            } else {
                var structure = creep.pos.findNearest(Game.STRUCTURES, {filter: function(structure) { return structure.hits < structure.hitsMax / 2; }});
/*
should completely repair it then...
*/
                if (structure) {
                    creep.moveTo(structure);
                    creep.repair(structure);
                } else flag(creep);
            }
        }
    ],
};