import Hero from './Hero';

export default class Pick {
  hero: Hero;
  role: string;
  lane: string;

  constructor(hero: ?Hero = null) {
    this.hero = hero;
  }
}
