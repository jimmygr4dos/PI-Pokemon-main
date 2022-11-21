const { Router } = require('express');
const { getTypes } = require("./functions");

const router = Router();

router.get('/', async (req, res) => {

    try {
        const types = await getTypes();
        if (types)
            return res.json(types);
    } catch (error) {
        console.log(error);
        return res.status(404).send(error.message);
    }

});

module.exports = router;