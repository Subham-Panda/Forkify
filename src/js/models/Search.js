import axios from 'axios';
import {key} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}&number=100`);
            this.recipes = res.data.results;
            console.log(this.recipes);
        } catch(error) {
            alert(error);
        }
        
    }
}
