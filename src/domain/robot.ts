import { coordinates } from "./coordinates";
import { RobotStatus } from "./robot_status";
import { RobotOrientation } from "./robot_orientation";

export class Robot{
    private startPosition:coordinates;
    private orientation:RobotOrientation;
    private status:RobotStatus;
    private currentPosition:coordinates;

    constructor(start:coordinates, orientation:RobotOrientation) {
        this.startPosition = start;
        this.currentPosition = { ...this.startPosition};
        this.orientation = orientation;
        this.status = RobotStatus.WORKING;
    }

    public rotate(direction:string) {
        if(direction === 'L')
            this.rotateLeft();
        else if(direction === 'R') 
            this.rotateRight();
        else
            throw new Error("the option is not valid");
    }

    private rotateRight() {
        this.orientation = this.orientation.clockwise();
    }

    private rotateLeft() {
        this.orientation = this.orientation.counterClockwise();
    }

    public getOrientation(): RobotOrientation {
        return this.orientation;
    }

    public getStatus(): RobotStatus{
        return this.status;
    }

    public isLost() {
        this.status = RobotStatus.LOST;
    }

    public getCurrentPosition(): coordinates {
        return this.currentPosition;
    }

    public setCurrentPosition(newPosition: coordinates) {
        this.currentPosition = newPosition;
    }
}