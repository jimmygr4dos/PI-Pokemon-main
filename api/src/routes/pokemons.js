const { Router } = require('express');
const { getApiData, getDbData, getApiDataByName, getApiDataById, 
        getDbDataById, createPokemon, deletePokemon, updatePokemon } = require("./functions");

const router = Router();

router.get('/', async (req, res) => {

    try {

        let { name } = req.query;
        name = name.toLowerCase();
        if (name) {
            //buscar datos de la api x nombre
            const apiPokemonByName = await getApiDataByName(name);
            if (apiPokemonByName)
                return res.json(apiPokemonByName);
            //buscar datos de la db x nombre
            else {
                const dbPokemonByName = await getDbData(name);
                if (dbPokemonByName)
                    return res.json(dbPokemonByName);
                else
                    return res.status(404).send("This Pokemon doesn't exist!");
            }
        }

        else {
            const apiPokemons = await getApiData();
            const dbPokemons = await getDbData();
            const allPokemons = [...apiPokemons, ...dbPokemons];
            if (allPokemons)
                return res.json(allPokemons);
        }
    
        
    } catch (error) {
        console.log(error);
        return res.status(404).send(error.message);
    }

});

router.get("/:idPokemon", async (req, res) => {
    try {
        const { idPokemon } = req.params;
        const apiPokemonById = await getApiDataById(idPokemon);
        if (apiPokemonById)
            return res.json(apiPokemonById);
        else {
            const dbPokemonById = await getDbDataById(idPokemon);
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

router.delete("/:idPokemon", async (req, res) => {
    try {
        const { idPokemon } = req.params;
        const pokemon = deletePokemon(idPokemon);
        res.json(idPokemon);
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
        return res.json(pokemon);
    } catch (error) {
        console.log(error);
        return res.status(404).send(error.message);        
    }
})

module.exports = router;