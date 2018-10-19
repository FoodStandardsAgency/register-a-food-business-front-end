const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const editRouter = () => {
  const router = Router();

  router.post("/continue/:originator", (req, res) => {
    //step 1 click change
    //step 2 user is sent to page that they want to edit with editMode on
    //user changes details
    //user presses save
    // user's new data from that page is sent to the edit route, along with all previous/existing answers
    // some functions are called to work out where to go next
    const controllerResponse = editController(
      
    );

    
    // the updated user data is added to the session

    
    // user is either redirected to another page within subflow or to registration summary
    //res.redirect(`/new/${req.session.council}/continue/:originator`)
  });

  router.get("/:target", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/edit/:target route");

    const target = req.params.target;

    logEmitter.emit("functionSuccess", "Routes", "/edit/:target route");
    res.redirect(`/new/${req.session.council}/${target}?edit=${target}`);
  });

  return router;
};

module.exports = { editRouter };
