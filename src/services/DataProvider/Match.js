export default class Match {
  id: number;
  date: Date;
  radiant: Pick<>;
  dire: Pick<>;
  fetched: boolean;
  winner: string;
  dateText: string;
  skillBracket: string;
  duration: string;
  region: string;
  gameMode: string;

  constructor() {
    this.fetched = false;
  }
}
