import { v4 as uuid } from 'uuid';

export class Quest {

    /**
     * Creates a new quest object
     * 
     * @param {*} args An object containing quest properties
     */
    constructor(args) {
        this.id = uuid();
        this.name = args.name || 'Generic Quest';
        this.description = args.description || 'Generic Quest';
        this.heroId = args.heroId;
    }

    /**
     * Updates the quest object with new values
     * 
     * @param {Partial<Hero>} arg A partial Quest Object
     */
    updateQuest(args) {
        if(args.name) {
            this.name = args.name;
        }
        if(args.description){
            this.description = args.description;
        }
    }
}