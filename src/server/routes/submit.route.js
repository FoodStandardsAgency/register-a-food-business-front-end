/**
 * The submit router sends registration data and declaration to the back-end service and redirects to the final page if successful.
 * Routes: /submit
 * @module routers/submit
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const submitController = require("../controllers/submit.controller");

const submitRouter = () => {
    const router = Router();

    router.get("", async (req, res) => {
        logEmitter.emit("functionCall", "Routes", "/submit route");

        if (req.session.submissionSucceeded) {
            logEmitter.emit(
                "functionSuccessWith",
                "Routes",
                "/submit route",
                "/summary-confirmation"
            );
            res.redirect(`/new/${req.session.council}/summary-confirmation`);
        } else {
            if (!req.session.submissionPending) {
                req.session.submissionPending = true;
                req.session.save((err) => {
                    if (err) {
                        logEmitter.emit(
                            "functionFail",
                            "Routes",
                            "/submit route",
                            err
                        );
                        throw err;
                    }
                });

                const controllerResponse = await submitController(
                    req.session.council,
                    req.session.cumulativeFullAnswers,
                    req.session.addressLookups,
                    req.session.pathConfig._id
                );

                req.session.submissionDate = controllerResponse.submissionDate;
                req.session.fsaRegistrationNumber =
                    controllerResponse.fsaRegistrationNumber;
                req.session.emailFbo = controllerResponse.emailFbo;
                req.session.lcConfig = controllerResponse.lcConfig;
                req.session.submissionSucceeded =
                    controllerResponse.submissionSucceeded;
                req.session.submissionPending = false;

                logEmitter.emit(
                    "functionSuccessWith",
                    "Routes",
                    "/submit route",
                    controllerResponse.redirectRoute
                );
                if (controllerResponse.redirectRoute === "back") {
                    req.session.submissionError =
                        controllerResponse.submissionError;
                    res.redirect("back");
                }
                req.session.save((err) => {
                    if (err) {
                        logEmitter.emit(
                            "functionFail",
                            "Routes",
                            "/submit route",
                            err
                        );
                        throw err;
                    }
                    res.redirect(
                        `/new/${req.session.council}${controllerResponse.redirectRoute}`
                    );
                });
            }
        }
    });

    return router;
};

module.exports = { submitRouter };
