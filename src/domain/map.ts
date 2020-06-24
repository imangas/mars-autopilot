import { coordinates } from "./coordinates";

export class Map{
    private maxPoint:coordinates;
    private zeroPoint:coordinates = {
        x:0,
        y:0
    }

    constructor(dimension:coordinates) {
        if( dimension.x < 0 || dimension.y < 0 ){
            throw new Error("Map's dimension could not be negative");
        }
        this.maxPoint = dimension;
    }

    public isCoordInMap(coordinate:coordinates): boolean {
        if(coordinate.x < this.zeroPoint.x || coordinate.x > this.maxPoint.x ){
            return false;
        }
        if(coordinate.y < this.zeroPoint.y || coordinate.y > this.maxPoint.y) {
            return false;
        }
        return true;
    }
}