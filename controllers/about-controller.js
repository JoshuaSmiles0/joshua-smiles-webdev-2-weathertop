export const aboutController = {
  //renders about-view on request
  index(request, response) {
    const viewData = {
      title: "About Station",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
