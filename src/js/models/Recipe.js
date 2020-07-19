import axios from 'axios';
import {key} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`);
            this.title = res.data.title;
            this.author = res.data.sourceName;
            this.img = res.data.image;
            this.url = res.data.sourceUrl;
            this.ingredients = res.data.extendedIngredients;
            this.time = res.data.readyInMinutes;
            this.servings = res.data.servings;
            console.log(res);
        } catch(error) {
            alert(error);
        }
    }

    calcTime() {
        console.log('TIME');
    }

    calcServings() {
        console.log('SERVINGS');
    }

    getShortUnit() {
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teapoons','teapoon','cups','c','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','cup','pound'];
        
        this.ingredients.forEach(ele => {
            unitsLong.forEach((unit, i) => {
                if(ele.unit === unit) {
                    ele.unit = ele.unit.replace(unit, unitsShort[i]);
                }
            })
        })
    }

    updateServings (type) {
        //Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        //Ingredients
        this.ingredients.forEach(ing => {
            ing.amount = ing.amount * (newServings / this.servings);
        });


        this.servings = newServings;
    }
}