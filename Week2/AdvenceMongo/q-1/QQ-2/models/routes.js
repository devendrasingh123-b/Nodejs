const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/vehicle.controller");

// Vehicle CRUD
router.post("/vehicles", ctrl.createVehicle);
router.get("/vehicles", ctrl.getAllVehicles);
router.put("/vehicles/:id", ctrl.updateVehicle);
router.delete("/vehicles/:id", ctrl.deleteVehicle);

// Trip CRUD inside vehicle
router.post("/vehicles/:id/trips", ctrl.addTrip);
router.put("/vehicles/:id/trips/:tripIndex", ctrl.updateTrip);
router.delete("/vehicles/:id/trips/:tripIndex", ctrl.deleteTrip);

// Advanced Queries
router.get("/query/trip-over-200", ctrl.tripOver200km);
router.get("/query/from-cities", ctrl.tripFromCities);
router.get("/query/after-jan-2024", ctrl.tripAfterJan2024);
router.get("/query/cars-trucks", ctrl.carAndTruck);

// Bonus: Total Distance
router.get("/vehicles/:id/total-distance", ctrl.getTotalDistance);

module.exports = router;