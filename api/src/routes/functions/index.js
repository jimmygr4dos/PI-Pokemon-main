const axios = require("axios")
const { Pokemon, Type } = require("../../db");

module.exports = {

    getApiData: async () => {
        try {
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon');
            const resultUrl = result.data.results.map(async r => await axios.get(r.url));
            const data = await Promise.all(resultUrl)
            .then (d => {
                const arrDataPokemon = d.map(e => e.data);
                // console.log(arrDataPokemon);
                const arrFinalPokemon = arrDataPokemon.map(pokemon => {
                    return {
                        id: pokemon.id,
                        name: pokemon.name,
                        hp: pokemon.stats[0].base_stat, //hp: hit points
                        attack: pokemon.stats[1].base_stat,
                        defense: pokemon.stats[2].base_stat,
                        speed: pokemon.stats[5].base_stat,
                        height: pokemon.height, //7 / 10 m
                        weight: pokemon.weight, //69 / 10 kg
                        image: pokemon.sprites.other.dream_world.front_default,
                        // image: pokemon.sprites.other.home.front_default,
                        types: pokemon.types.map((e) => e.type.name),
                    }
                })
                return arrFinalPokemon;
            })
            return data;
        }
        catch (e) {
            console.log(e);
        }
    },

    getDbData: async () => {
        try {
            const { name } = req.query;
            const condition = {};
            const where = {};
            if (name) where.name = name;
            condition.where = where;

            const pokemons = await Pokemon.findAll(condition, {
                include: {
                model: Type,
                //   through: {
                //     attributes: [],
                //   },
                },
                // attributes: ["id", "name", "image", "attack", "created"],
            });
            return pokemons.map((e) => ({
                id: e.id,
                name: e.name,
                hp: e.hp, //hp: hit points
                attack: e.attack,
                defense: e.defense,
                speed: e.speed,
                height: e.height, //7 / 10 m
                weight: e.weight, //69 / 10 kg
                image: e.image,
                types: e.types.map((e) => e.name),
                created: e.created,
            }));
        }
        catch (e) {
            console.log(e);
        }
    },

    getApiDataByName: async (name) => {
        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemon = result.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.stats[0].base_stat, //hp: hit points
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height, //7 / 10 m
                weight: pokemon.weight, //69 / 10 kg
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types.map((p) => p.type.name),
            }
        }
        catch (e) {
            console.log(e);
        }
    },

    getApiDataById: async (id) => {
        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemon = result.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.stats[0].base_stat, //hp: hit points
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height, //7 / 10 m
                weight: pokemon.weight, //69 / 10 kg
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types.map((p) => p.type.name),
            };
        } 
        catch (e) {
            console.log(e);
        }
    },

    getDbDataById: async (id) => {
        try {
            const pokemon = await Pokemon.findByPk(id, {
                include: {
                model: Type,
                //   attributes: ["name"],
                //   through: {
                //     attributes: [],
                //   },
                },
            });
            return {
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.stats[0].base_stat, //hp: hit points
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height, //7 / 10 m
                weight: pokemon.weight, //69 / 10 kg
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types.map((p) => p.type.name),
            };
        } 
        catch (e) {
            console.log(e);
        }
    },

    getTypes: async () => {
        try {
            const result = await axios.get("https://pokeapi.co/api/v2/type");
            const types = result.data.results;
        
            types.map(type => {
                Type.findOrCreate({
                    where: {
                        name: type.name,
                    }
                })
            });
        
            const dbTypes = await Type.findAll();
            return dbTypes;
        } catch (e) {
            console.log(e);
        }
    },

    createPokemon: async (name, hp, attack, defense, speed, height, weight, image, types) => {
        try {
            if (!image) image = 'https://pm1.narvii.com/6532/8441679e98967e38588e00e7a65f788ca0f820ee_00.jpg';
            const pokemon = await Pokemon.create({
                name, hp, attack, defense, speed, height, weight, image
            });
            
            const typeDb = await Type.findAll({
                where: {
                    name: types,
                }
            });
    
            pokemon.addType(typeDb);
            return pokemon;
        }
        catch (e) {
            console.log(e);
        }
    },

    updatePokemon: async (id, name, hp, attack, defense, speed, height, weight, image, types) => {
        try {
            if (!image) image = 'https://pm1.narvii.com/6532/8441679e98967e38588e00e7a65f788ca0f820ee_00.jpg';
            
            const pokemon = await Pokemon.findByPk(id);

            if (pokemon) {
                await pokemon.update({
                    name: name, 
                    hp: hp, 
                    attack: attack, 
                    defense: defense, 
                    speed: speed, 
                    height: height, 
                    weight: weight, 
                    image: image
                });

                const promises = types.map(t => pokemon.setTypes(t));
                await Promise.all(promises);
                
                return pokemon;
            }
        }
        catch (e) {
            console.log(e);
        }
    },

    deletePokemon: async (id) => {
        try {
            Pokemon.destroy({
                where: {
                    id
                }
            });
            return "The pokemon was deleted successfully!";
        } catch (e) {
            console.log(e);
        }
    },

}