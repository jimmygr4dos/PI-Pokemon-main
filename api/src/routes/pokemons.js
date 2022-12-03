const { Router } = require('express');
const { getApiData, getDbData, getApiDataByName, getDBDataByName, getApiDataById, getDbDataById,
        createPokemon, deletePokemon, updatePokemon } = require("./functions");

const router = Router();

router.get('/', async (req, res) => {

    try {

        let { name } = req.query;
        if (name) {
            name = name.toLowerCase();
            console.log('name: ', name);
            //buscar datos de la api x nombre
            const apiPokemonByName = await getApiDataByName(name);
            if (apiPokemonByName) {
                console.log('apiPokemonByName: ', apiPokemonByName)
                return res.json({sucess: true, data: apiPokemonByName});
            }
            //buscar datos de la db x nombre
            else {
                const dbPokemonByName = await getDBDataByName(name);
                if (dbPokemonByName.length > 0) {
                    console.log('dbPokemonByName: ', dbPokemonByName)
                    return res.json({sucess: true, data: dbPokemonByName});
                }
                else {
                    console.log('throw error');
                    throw Error(JSON.stringify({sucess: false, data: "This Pokemon doesn't exist!"}));
                    // res.status(404).json({ error: "This Pokemon doesn't exist!" });
                    // return res.status(404).send("This Pokemon doesn't exist!");
                }
            }
        }

        else {
            const apiPokemons = await getApiData();
            const dbPokemons = await getDbData();
            if (dbPokemons) {
                // const allPokemons = [...apiPokemons, ...dbPokemons];
                const allPokemons = [...dbPokemons, ...apiPokemons];
                return res.json(allPokemons);
            }
            else {
                return res.json(apiPokemons);
            }

        }
    
        
    } catch (error) {
        console.log(error.message);
        return res.status(404).send(error.message);
    }

});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const apiPokemonById = await getApiDataById(id);
        if (apiPokemonById)
            return res.json(apiPokemonById);
        else {
            const dbPokemonById = await getDbDataById(id);
            if (dbPokemonById)
                return res.json(dbPokemonById);
            else
                return res.status(404).send("This Pokemon doesn't exist!");
        }
    }
    catch (error) {
        console.log(error);
        return res.status(404).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;
        if (!name)
            return res.status(404).send("The Pokemon's name is required!");
        const pokemon = await createPokemon(
            name, hp, attack, defense, speed, height, weight, image, types
        );
        return res.json(pokemon);
    } catch (error) {
        console.log(error);
        return res.status(404).send(error.message);        
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await deletePokemon(id);
        res.json(pokemon.message);
    } catch (error) {
        console.log(error);
        return res.status(404).send(error.message);        
    }
});

router.put('/', async (req, res) => {
    try {
        const { id, name, hp, attack, defense, speed, height, weight, image, types } = req.body;
        if (!name)
            return res.status(404).send("The Pokemon's name is required!");
        const pokemon = await updatePokemon(
            id, name, hp, attack, defense, speed, height, weight, image, types
        );
        return res.json(pokemon.message);
    } catch (error) {
        console.log(error);
        return res.status(404).send(error.message);        
    }
})

module.exports = router;