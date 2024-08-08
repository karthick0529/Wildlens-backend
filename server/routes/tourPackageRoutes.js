//import the express for router
const express = require("express");

//import the tourPackageController
const tourPackageController = require("../controllers/tourPackagesController");

//import the auth
const auth = require('../middleware/auth');

//import the express router
const tourPackageRouter = express.Router();

//define the endpoints
tourPackageRouter.post("/" ,auth.isAuth ,auth.isAdmin , tourPackageController.createTour);
tourPackageRouter.get("/" , tourPackageController.listTours);
tourPackageRouter.get("/:id" , tourPackageController.getTourById);
tourPackageRouter.put("/:id" ,auth.isAuth ,auth.isAdmin , tourPackageController.updateTourById);
tourPackageRouter.delete("/:id" ,auth.isAuth ,auth.isAdmin , tourPackageController.deleteTourById);
tourPackageRouter.get("/search/getTourBySearch"  , tourPackageController.getTourBySearch);
tourPackageRouter.get("/search/getAvailableTour"  , tourPackageController.getAvailableTour);
tourPackageRouter.get("/search/getTourCount"  , tourPackageController.getTourCount);

//export the module
module.exports = tourPackageRouter;