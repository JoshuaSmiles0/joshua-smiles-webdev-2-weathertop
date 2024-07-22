export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Station 1 Dashboard",
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
};
