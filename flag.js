var util = require("util");

module.exports = function(creep) {
    var flag =  creep.pos.findNearest(Game.FLAGS, {filter: function(flag) { return util.contains(flag.name, creep.memory.role) || util.contains(flag.name, "ALL"); }});

    if(flag) {
        creep.moveTo(flag);
    }
};
