import { supertestSetup } from "../../test/SupertestSetup.js";
import { questsRouter } from "./router.js";

const request = supertestSetup(questsRouter());
let HEROID = '';
let QUESTID = '';
let WRONGHEROID = '';

describe('Quests Module', ()=> {
    beforeAll(async () => {
        // Get a hero id to use for getting/updating/deleting
        await request.post('/heroes')
            .send({
                name: 'Shiro',
                class: 'Enchanter',
                level: 90,
            });
        await request.post('/heroes')
            .send({
                name: "Nautsugu",
                class: 'Guardian',
                level: 90
            });
        const heroRes = await request.get('/heroes');
        HEROID = heroRes.body[0].id;
        WRONGHEROID = heroRes.body[1].id;
        await request.post(`/heroes/${HEROID}/quests`)
            .send({
                name: "Dangerous Dungeon Delves",
                description: "Delve Dangerous Dungeons",
                heroId: HEROID
            });
        const questRes = await request.get(`/heroes/${HEROID}/quests`);
        QUESTID = questRes.body[0].id;
    });
    
    /**
     * test get all quests route
     */
    describe('GET /quests', () => {
        it('should return a 200 for all quests', done => {
            request.get('/quests')
                .expect(200, done);
        });
    });

    /**
     * test for getting all quests related to a certain hero
     */
    describe('GET /heroes/:id/quests', ()=>{
        it('should return a 201 for all quests related to heroId', done =>{
            request.get(`/heroes/${HEROID}/quests`)
                .expect(201, done);
        });
        it('should return a 404 for not found hero', done =>{
            request.get('/heroes/abc/quests')
                .expect(404, done);
        });
    });

    /**
     * test for posting a new quest
     */
    describe('POST /heroes/:id/quests', ()=>{
        it('should return a 201 for successfully added quest', done =>{
            request.post(`/heroes/${HEROID}/quests`)
                .send({
                    name: "Super Dangerous Dungeon Delves",
                    description: "Delve Super Dangerous Dungeons",
                    heroId: HEROID
                })
                .expect(201, done);
        });
        it('should return a 404 for an invalid hero id', done => {
            request.post('/heroes/abc/quests')
                .send({
                    name: "Super Dangerous Dungeon Delves",
                    description: "Delve Super Dangerous Dungeons",
                    heroId: 'abc'
                })
                .expect(404, done);
        });
    });

    /**
     * test for updateing a quest by hero id and quest id
     */
    describe('PATCH /heroes/:heroId/quests/:questId', () => {
        it('should return a 204 for a successfully updated quest', done=>{
            request.patch(`/heroes/${HEROID}/quests/${QUESTID}`)
                .send({
                    description: "changed Description"
                })
                .expect(204, done);
        });
        it('should return a 404 for hero or quest id not found', done=>{
            request.patch(`/heroes/${HEROID}/quests/abc`)
                .send({
                    description: "changed Description"
                })
                .expect(404, done);
        });
        it('should return a 404 for hero or quest id not found', done=>{
            request.patch(`/heroes/abc/quests/${QUESTID}`)
                .send({
                    description: "changed Description"
                })
                .expect(404, done);
        });
        it('should return a 400 for route heroId does not match QuestId', done=> {
            request.patch(`/heroes/${WRONGHEROID}/quests/${QUESTID}`)
                .send({
                    description: "changed Description"
                })
                .expect(400, done);
        })
    });

    describe('DELETE /heroes/:heroId/quests/:questId', ()=>{
        it('should return a 204 for a successfully deleted quest', done=> {
            request.delete(`/heroes/${HEROID}/quests/${QUESTID}`)
                .expect(204, done);
        });
        it('should return a 404 for hero or quest id not found', done=>{
            request.delete(`/heroes/${HEROID}/quests/abc`)
                .expect(404, done);
        });
        it('should return a 404 for hero or quest id not found', done=>{
            request.delete(`/heroes/abc/quests/${QUESTID}`)
                .expect(404, done);
        });
        it('should return a 400 for route heroId does not match QuestId', done=> {
            request.delete(`/heroes/${WRONGHEROID}/quests/${QUESTID}`)
                .expect(400, done);
        });
    });
});