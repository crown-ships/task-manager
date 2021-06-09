const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("user")
 .readOwn("profile")
 .updateOwn("profile")
 .readAny("company")
 .readAny("project")
 .updateAny("project")
 .create("project")
 .readAny("feature")
 .updateAny("feature")
 .create("feature")
 .readAny("task")
 .updateAny("task")
 .create("task")


ac.grant("admin")
 .extend("user")
 .readAny("profile")
 .updateAny("profile")
 .deleteAny("profile")
 .create("profile")
 .updateAny("company")
 .deleteAny("company")
 .create("company")
 .deleteAny("project")
 .deleteAny("feature")
 .deleteAny("task")

return ac;
})();
