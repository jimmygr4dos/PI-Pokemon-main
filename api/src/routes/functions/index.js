const axios = require("axios")
const { Pokemon, Type } = require("../../db");

module.exports = {

    getApiData: async () => {
        try {
            //Comentar!
            // const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
            // const result = await axios.get('https://pokeapi.co/api/v2/pokemon');

            const firstTwentyPokemons = await axios.get("https://pokeapi.co/api/v2/pokemon/");
            // console.log('firstTwentyPokemons: ', firstTwentyPokemons);
            const secondTwentyPokemons = await axios.get(firstTwentyPokemons.data.next);
            // console.log('secondTwentyPokemons: ', secondTwentyPokemons);

            //Descomentar!
            // const allPokemons = [...result.data.results];
            const allPokemons = [...firstTwentyPokemons.data.results, ...secondTwentyPokemons.data.results];
            // console.log('allPokemons: ', allPokemons)
            //array de objetos --> [{name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'}, ...]
            
            // const result = await Promise.all(allPokemons);
            // firstTwentyPokemons.data.results.concat(secondTwentyPokemons.data.results);

            // console.log('result: ', result);
            // const urlAllPokemons = result.data.results.map(async r => await axios.get(r.url));
            const urlAllPokemons = allPokemons.map(async r => await axios.get(r.url));
            // console.log('urlAllPokemons: ', urlAllPokemons)
            // array de promesas --> [Promise { <pending> }, Promise { <pending> }, ...]
            const allPokemonsFinal = await Promise.all(urlAllPokemons).then (d => {
                const arrDataPokemon = d.map(e => e.data);
                // console.log('arrDataPokemon: ', arrDataPokemon);
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
                        types: pokemon.types.map((t) => t.type.name),
                    }
                })
                return arrFinalPokemon;
            })
            return allPokemonsFinal;
        }
        catch (e) {
            console.log(e);
        }
    },

    getDbData: async () => {
        try {
            const pokemons = await Pokemon.findAll({
                include: {
                model: Type,
                //   through: {
                //     attributes: [],
                //   },
                },
                // attributes: ["id", "name", "image", "attack", "created"],
            });
            return pokemons.map((pokemon) => ({
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.hp, //hp: hit points
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height, //7 / 10 m
                weight: pokemon.weight, //69 / 10 kg
                image: pokemon.image,
                types: pokemon.types.map((t) => t.name),
                created: pokemon.created,
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
            return [{
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.stats[0].base_stat, //hp: hit points
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height, //7 / 10 m
                weight: pokemon.weight, //69 / 10 kg
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types.map((t) => t.type.name),
            }]
        }
        catch (e) {
            console.log(e.response.data);
            console.log(e.response.status);
            // if (e.response.data === 'Not Found') {
            //     throw new Error("This Pokemon doesn't exist!"); 
            // }
            // throw Error("{'" + e.response.status + "':'" + e.response.data + "'}");
            // throw {error: new Error()};
            // throw Error(JSON.stringify("{'" + e.response.status + "':'" + e.response.data + "'}"));
            // throw new Error(JSON.stringify("This Pokemon doesn't exist!"));
            // throw Error(e);
        }
    },

    getDBDataByName: async (name) => {
        try {
            // const condition = {};
            // const where = {};
            // if (name) where.name = name;
            // condition.where = where;
                
            const pokemons = await Pokemon.findAll({
                // condition,
                where: {
                    name,
                },
                include: {
                model: Type,
                //   through: {
                //     attributes: [],
                //   },
                },
                // attributes: ["id", "name", "image", "attack", "created"],
            });
            return pokemons.map((pokemon) => ({
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.hp, //hp: hit points
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height, //7 / 10 m
                weight: pokemon.weight, //69 / 10 kg
                image: pokemon.image,
                types: pokemon.types.map((t) => t.name),
                created: pokemon.created,
            }));
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
                types: pokemon.types.map((t) => t.type.name),
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
                hp: pokemon.hp, //hp: hit points
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height, //7 / 10 m
                weight: pokemon.weight, //69 / 10 kg
                image: pokemon.image,
                types: pokemon.types.map((t) => t.name),
                created: pokemon.created,
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
        
            types.forEach(type => {
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
            
            //se registran los tipos
            pokemon.addType(typeDb);

            return pokemon;
        }
        catch (e) {
            console.log(e);
        }
    },

    deletePokemon: async (id) => {
        try {
            await Pokemon.destroy({
                where: {
                    id
                }
            });
            return {message: "The pokemon was deleted successfully!"};
        } catch (e) {
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
    
                const typeDb = await Type.findAll({
                    where: {
                        name: types,
                    }
                });
                
                //se actualizan los tipos
                pokemon.setTypes(typeDb);

                return {message: "The pokemon was updated successfully!"};;
            }
        }
        catch (e) {
            console.log(e);
        }
    },
    
}