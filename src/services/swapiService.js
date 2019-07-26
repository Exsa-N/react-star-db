export default class SwapiService 
{
    _apiBase = 'https://swapi.co/api';
    _imgBase = 'https://starwars-visualguide.com/assets/img';
    async getResource(url) 
    {
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) 
            throw new Error(`Could not, fetch ${res.status}, recived ${res.status}`);
        return await res.json();
    };
    getPersonImg = (id) => {
      return `${this._imgBase}/characters/${id}.jpg`;
    }
    getStarshipImg = (id) => {
      return `${this._imgBase}/starships/${id}.jpg`;
    }
    getPlanetImg = (id) => {
      return `${this._imgBase}/planets/${id}.jpg`;
    }
    getAllPeople = async() =>{
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
      }
    
    getPerson = async(id) => {
      const person = await this.getResource(`/people/${id}/`);
      return this._transformPerson(person);
    }
    
    getAllPlanets = async() =>{
      const res = await this.getResource(`/planets/`);
      return res.results.map(this._transformPlanet);
    }
  
    getPlanet  = async(id) => {
      const planet = await this.getResource(`/planets/${id}/`);
      return this._transformPlanet(planet);
    }
  
    getAllStarships = async() =>{
      const res = await this.getResource(`/starships/`);
      return res.results.map(this._transformStarship);
    }
  
    getStarship = async(id) => {
      const starship = await this.getResource(`/starships/${id}/`);
      return this._transformStarship(starship);
    }
  
    _extractId(item) {
      const idRegExp = /\/([0-9]*)\/$/;
      return item.url.match(idRegExp)[1];
    }
    
    _transformPlanet = (planet) => {
      const id = this._extractId(planet);
      return {
          id,
          img: this.getPlanetImg(id),
          name: planet.name,
          population:planet.population,
          rotationPeriod: planet.rotation_period,
          diameter: planet.diameter
        }
    }
    _transformStarship = (starship) => {
      const id = this._extractId(starship);
      return {
          id,
          img: this.getStarshipImg(id),
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          costInCredits: starship.cost_in_credits,
          length: starship.length,
          crew: starship.crew,
          passengers: starship.passengers,
          cargoCapacity: starship.cargo_capacity
        }
    }
    _transformPerson = (person) => {
      const id = this._extractId(person);
      return {
          id,
          img: this.getPersonImg(id),
          name: person.name,
          gender: person.gender,
          birthYear: person.birth_year,
          eyeColor: person.eye_color
        }
    }
}
