import express from 'express';
import { HeroesDB } from '../../database/HeroesDB';
import { QuestDB } from '../../database/QuestsDB';
import { Quest } from '../../types/Quest';

export function questsRouter() {
    const router = express.Router();

    /**
     * gets a list of quests by the hero's ID
     */
    router.get('heroes/:id/quests', (req, res) => {
        const heroId = req.params.id;
        let heroQuests = QuestDB.getInstance().getQuestsByHeroId(heroId);
        
        if(heroQuests.length === 0){
            res.status(404).send("Hero was not found for given ID");
        }else{
            res.status(201).send(heroQuests);
        }

    })

    /**
     * creates a new quest
     */
    router.post('/heroes/:id/quests',(req, res) => {
        const body = req.body;
        const heroId = req.params.id;
        const hero = HeroesDB.getInstance().getHero(heroId);
        const quest = new Quest(body);
        if(!hero){
            res.status(404).send("Hero was not found for given ID");
        }else{
            QuestDB.getInstance().createQuest(quest);
            res.sendStatus(201)
        }
        
    })
    /**
     * updates the quest given by HeroId and questId
     */
    router.patch('/heroes/:heroId/quests/:questId', (req, res) => {
        const body = req.body;
        const heroId = req.params.heroId;
        const questId = req.params.questId;
        const hero = HeroesDB.getInstance().getHero(heroId);
        const quest = QuestDB.getInstance().getQuest(questId);

        if(!hero || !quest){
            res.status(404).send("Hero or Quest was not found for given ID's");
        }else if (quest.heroId !== heroId){
            res.status(400).send("Route heroId does not match the Quest's heroId in database");
        }else{
            QuestDB.getInstance().updateQuest(questId, body);
            res.sendStatus(204)
        }
    })
    // TODO: Task 4
    router.delete('/heroes/:heroId/quests/:questId', (req, res) => {
        const body = req.body;
        const heroId = req.params.heroId;
        const questId = req.params.questId;
        const hero = HeroesDB.getInstance().getHero(heroId);
        const quest = QuestDB.getInstance().getQuest(questId);

        if(!hero || !quest){
            res.status(404).send("Hero or Quest was not found for given ID's");
        }else if (quest.heroId !== heroId){
            res.status(400).send("Route heroId does not match the Quest's heroId in database");
        }else{
            QuestDB.getInstance().deleteQuest(questId);
            res.status(204).send('Quest was deleted in the database');
        }
    })
    return router;
}