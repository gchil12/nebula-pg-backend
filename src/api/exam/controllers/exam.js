"use strict";

const { default: axios } = require("axios");

/**
 *  exam controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::exam.exam", ({ strapi }) => ({
  setMessengerId: async (ctx, next) => {
    const { messengerId, chatbotKey } = ctx.request.body;
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { chatbotKey: chatbotKey },
      });
    if (user.messengerId) {
      axios.post("https://hooks.zapier.com/hooks/catch/10862516/bfcfr5r/", {
        messengerId: user.messengerId,
        message: "ამ ფეისბუქით რეგისტრაცია უკვე გავლილია",
      });
      throw new Error("მომხმარებელი ამ Facebook-ით უკვე");
    } else {
      axios.post("https://hooks.zapier.com/hooks/catch/10862516/bfcfyps/", {
        messengerId: messengerId,
      });
    }
    const entry = await strapi.db
      .query("plugin::users-permissions.user")
      .update({
        where: { id: user.id },
        data: {
          messengerId: messengerId,
        },
      });
    return user.id;
  },
  setChatbotKey: async (ctx, next) => {
    const { userId, chatbotKey } = ctx.request.body.body;
    const entry = await strapi.entityService.update(
      "plugin::users-permissions.user",
      userId,
      { data: { chatbotKey: chatbotKey } }
    );
    return entry.id;
  },
}));
