export default class Match {
  id: number;
  date: Date;
  picks: Pick<>;
  fetched: boolean;

  constructor() {
    this.fetched = false;
  }
}
