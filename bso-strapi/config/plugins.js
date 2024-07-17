module.exports = ({ env }) => ({
  "strapi-plugin-untransform-response": {
    enabled: true,
  },
  io: {
    enabled: true,
    config: {
      contentTypes: ["api::product.product"],

      socket: {
        serverOptions: {
          cors: {
            origin: "*",
            methods: ["GET", "POST"],
          },
        },
      },
    },
  },
});
