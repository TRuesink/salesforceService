const jsforce = require("jsforce");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc Retrieve sobjects specified in request
// @route GET /api/v1/sobjects/:type
// @access Private
exports.getSobjects = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Retrieve single sobject specified in request
// @route GET /api/v1/sobjects/:type/:id
// @access Private
exports.getSobject = asyncHandler(async (req, res, next) => {
  // ensure that there is an sobject in the params
  if (!req.params.type) {
    return next(
      new ErrorResponse("There was no SObject specified in the request", 400)
    );
  }

  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const sobject = await conn.sobject(req.params.type).retrieve(req.params.id);

  if (!sobject) {
    return next(
      new ErrorResponse(
        `Could not find ${req.query.sobject} with id of ${req.params.id}`
      )
    );
  }

  res.status(200).json({
    success: true,
    type: req.query.sobject,
    data: sobject,
  });
});

// @desc Update single sobject
// @route PUT /api/v1/sobjects/:type/:id
// @access Private
exports.updateSobject = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const updatedFields = { ...req.body, Id: req.params.id };

  const sobject = await conn.sobject(req.params.type).update(updatedFields);

  if (sobject.success === false) {
    return next(new ErrorResponse(`${sobject.errors}`));
  }

  res.status(200).json({ success: true, data: sobject });
});

// @desc Delete single sobject
// @route GET /api/v1/sobjects/:type/:id
// @access Private
exports.deleteSobject = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  await conn.sobject(req.params.type).destroy(req.params.id);

  res.status(200).json({ success: true, data: [] });
});

// @desc Create single sobject
// @route GET /api/v1/sobjects/:type
// @access Private
exports.createSobject = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const sobject = await conn.sobject(req.params.type).create(req.body);

  res.status(200).json({ success: true, data: sobject });
});
