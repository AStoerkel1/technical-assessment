import { Quest } from "../types/Quest";

export class QuestDB {
    static instance = undefined;
    quests = [];//database array

    /**
     * a method to get the QuestDB instance
     * 
     * @returns {QuestDB} the instance of the QuestDB
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new QuestDB();
        }
        return this.instance;
    }

    /**
     * gets all the quests in the database
     * @returns {Quests[]} an array of quests
     */
    getQuests() {
        return this.quests;
    }

    /**
     *  A method to get a quest with the specified id
     * @param {string} id 
     * @returns {Quest} a quest with the specified id
     */
    getQuest(id) {
        return this.quests.find(quest => quest.id === id);
    }

    /**
     * Adds a quest to the database
     * @param {Quest} quest the quest to add to the database
     */
    createQuest(quest) {
        this.quests.push(quest);
    }

    /**
     * a method to update a quest in the database
     * @param {string} id the id of the quest to update
     * @param {Partial<Quest>} questUpdates part of the quest object
     */
    updateQuest(id, questUpdates) {
        const quest = this.getQuest(id);
        this.deleteQuest(id);
        quest.updateQuest(questUpdates);
        this.createQuest(quest);
    }

    /**
     * a method to delete a quest with the specified id
     * @param {string} id of the quest to delete
     */
    deleteQuest(id) {
        const index = this.quests.findIndex(quest => quest.id === id);
        if (index >= 0) {
            this.quests.splice(index, 1);
        }
    }
}