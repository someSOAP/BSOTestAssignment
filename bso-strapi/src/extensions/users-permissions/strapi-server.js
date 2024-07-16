const pick = require("lodash/pick");

module.exports = (plugin) => {
  const getController = (name) => {
    return strapi.plugins["users-permissions"].controller(name);
  };

  // Create the new controller
  plugin.controllers.user.updateMe = async (ctx) => {
    const user = ctx.state.user;

    // User has to be logged in to update themselves
    if (!user) {
      return ctx.unauthorized();
    }

    // Pick only specific fields for security
    const newData = pick(ctx.request.body, ["cart"]);

    // Reconstruct context so we can pass to the controller
    ctx.request.body = newData;
    ctx.params = { ...ctx.params, id: user.id };

    // Update the user and return the sanitized data
    const userController = getController("user");
    await userController.update(ctx);

    return userController.findOne(ctx);
  };

  // Add the custom route
  plugin.routes["content-api"].routes.unshift({
    method: "PUT",
    path: "/users/me",
    handler: "user.updateMe",
    config: {
      prefix: "",
    },
  });

  return plugin;
};
