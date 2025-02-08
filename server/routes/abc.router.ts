import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("../helper");
const { abcController } = require("../controllers");
const abcValidation = require("../validations/abc.validation");
const { jwtAuthen } = require("../validations");

router.use(jwtAuthen);

router.post(
    "/create",
    wrapMiddleware(abcValidation.create),
    wrapController(abcController.create)
);
router.post(
    "/getRecords",
    wrapMiddleware(abcValidation.getAllRecordsByAccount),
    wrapController(abcController.getAllRecordsByAccount)
);
router.post(
    "/:id",
    wrapMiddleware(abcValidation.getRecordByID),
    wrapController(abcController.getRecordByID)
);
router.put(
    "/:id",
    wrapMiddleware(abcValidation.updateRecordById),
    wrapController(abcController.updateRecordById)
);
router.delete(
    "/:id",
    wrapMiddleware(abcValidation.deleteRecordById),
    wrapController(abcController.deleteRecordById)
);
router.get(
    "/export",
    wrapMiddleware(abcValidation.exportRecord),
    wrapController(abcController.exportRecord)
);
router.get(
    "/records/staff/:staffId",
    wrapMiddleware(abcValidation.getRecordsByStaffId),
    wrapController(abcController.getRecordsByStaffId)
);

router.get(
    "/records/student/:studentId",
    wrapMiddleware(abcValidation.getRecordsByStudentId),
    wrapController(abcController.getRecordsByStudentId)
);

// NOT NEEDED ANYMORE
// router.post(
//     "/import",
//     wrapMiddleware(abcValidation.importRecord),
//     wrapController(abcController.importRecord)
// );

module.exports = router;
