import express from 'express';
import { HeroesDB } from '../../database/HeroesDB.js';
import { Hero } from '../../types/Hero.js';

/**
 * Returns the Heroes Module express router
 * 
 * @returns {express.Router} The heroes module express router
 */
export function heroesRouter() {
    const router = express.Router();

    /**
     * Gets all hereos
     */
    router.get('/heroes', (req, res) => {
        res.send(HeroesDB.getInstance().getHeroes());
    });

    /**
     * Gets a single hero by id
     */
    router.get('/heroes/:id', (req, res) => {
        const id = req.params.id;
        const hero = HeroesDB.getInstance().getHero(id);

        // Return 404 if not found, else return hero object
        if (!hero) {
            res.sendStatus(404);
        } else {
            res.send(hero);
        }
    });

    /**
     * Creates a hero
     */
    router.post('/heroes', (req, res) => {
        const body = req.body;
        const hero = new Hero(body);
        HeroesDB.getInstance().createHero(hero);
        res.status(201).send({"message": "Created"});
    });

    /**
     * Updates a hero by id
     */
    router.patch('/heroes/:id', (req, res) => {
        const id = req.params.id;
        const body = req.body;

        const hero = HeroesDB.getInstance().getHero(id);
        if (!hero) {
            res.sendStatus(404);
        } else {
            HeroesDB.getInstance().updateHero(id, body);
            res.sendStatus(204);
        }
    });

    /**
     * Deletes a hero by id
     */
    router.delete('/heroes/:id', (req, res) => {
        const id = req.params.id;

        const hero = HeroesDB.getInstance().getHero(id);
        if (!hero) {
            res.sendStatus(404);
        } else {
            HeroesDB.getInstance().deleteHero(id);
            res.sendStatus(204);
        }
    });

    return router;
}