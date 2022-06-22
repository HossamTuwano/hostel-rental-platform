//function to control who has access to CRUDing an hostel
exports.canUpdate = (req, res, next) => {

    return res.status(200).json({
        data: req.body
    });
};  