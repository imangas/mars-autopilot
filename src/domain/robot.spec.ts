import { Robot } from "./robot";
import { RobotOrientation } from "./robot_orientation";

describe('Robot', () => {
    it('should create a Robot', async () => {
        const North = new RobotOrientation('N');
        const myRobot = new Robot({x:1,y:1}, North);
        expect(myRobot).toBeInstanceOf(Robot);
    });

    it('should turn Robot clockwise', async () => {
        const North = new RobotOrientation('N');
        const East = new RobotOrientation('E');
        const myRobot = new Robot({x:1,y:1}, North);

        myRobot.rotate('R');
        expect(myRobot.getOrientation()).toEqual(East);
    });

    it('should turn Robot anti-clockwise', async () => {
        const North = new RobotOrientation('N');
        const West = new RobotOrientation('W');
        const myRobot = new Robot({x:1,y:1}, North);

        myRobot.rotate('L');
        expect(myRobot.getOrientation()).toEqual(West);
    });
});