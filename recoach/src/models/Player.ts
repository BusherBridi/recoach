import { Stats } from './Stats';
export class Player{
    public id: string;
    public name: string;
    public stats: Stats;

    constructor(id: string, name: string, stats: Stats) {
        this.id = id;
        this.name = name;
        this.stats = stats;
    }
}