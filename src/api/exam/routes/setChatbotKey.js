module.exports = {
  routes: [
    {
      method: "POST",
      path: "/setChatbotKey",
      handler: "exam.setChatbotKey",
    },
    {
      method: "POST",
      path: "/setMessengerId",
      handler: "exam.setMessengerId",
    },
  ],
};
