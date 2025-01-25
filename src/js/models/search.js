import axios from "axios";

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(){
      const result =  await axios(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${this.query}`);
      this.result = result.data.data.recipes;
    }
}