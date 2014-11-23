module.exports = function() {
    var util = require("util");

    var roles = require("roles");

    for (var role in roles) {
        var delta = roles[role][0] - util.count(role);

        if (delta < 1) continue;

        for (var i = 0; i < delta; i++) {
            var spawn = util.spawn();
            if (spawn) {
                var newName = spawn.createCreep(roles[role][1]);
                if (typeof(newName) == "string") Memory.creeps[newName].role = role;
            } else break;
        }
    }

    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];

        if (creep.memory.role) {
            roles[creep.memory.role][2](creep);
        } else console.log("Creep " + creepName + " is not assigned to any role!");
    }
};