import { Map } from "./map";
import { Robot } from "./robot";
import { PilotCommands } from "./pilot_commands";
import { RobotStatus } from "./robot_status";
import { coordinates } from "./coordinates";
import { RobotOrientation } from "./robot_orientation";

export class AutoPilot{
    private map: Map;
    private robot: Robot|null;

    constructor(map:Map){
        this.map = map;
        this.robot = null;
    }

    public deployRobot(robot:Robot) {
        this.robot = robot;
    }

    public moveRobot(command:string) {
        if ( !this.robot )
            throw new Error("You must to deploy a Robot First!");
        
        if ( this.robot.getStatus() != RobotStatus.LOST ) {
            if ( command == PilotCommands.F )
                this.moveForward();
            else {
                this.robot?.rotate(command);
            }
        }
    }

    private moveForward() {
        if( !this.robot )
            throw new Error("You must to deploy a Robot First!");

        const robotPosition:coordinates = { ...this.robot.getCurrentPosition()};
        const robotOrientation:RobotOrientation = this.robot.getOrientation();
        
        switch(robotOrientation.Name()){
            case 'N':
                robotPosition.y += 1;
                break;
            case 'E':
                robotPosition.x += 1;
                break;
            case 'S':
                robotPosition.y -=1;
                break;
            case 'W':
                robotPosition.x -= 1;
                break;
        }

        if( !this.map.isCoordInMap(robotPosition) ) {
            this.robot.isLost();
        } else {
            this.robot.setCurrentPosition(robotPosition);
        }
    }

    public report(): string{
        if( !this.robot )
            throw new Error("You must to deploy a Robot First!");
        
        const robotPosition:coordinates = this.robot.getCurrentPosition();
        const robotOrientation:RobotOrientation = this.robot.getOrientation();
        const lost:string = this.robot.getStatus()?'':' LOST';
        
        return `${robotPosition.x} ${robotPosition.y} ${robotOrientation.Name()}${lost}`;
    }
}