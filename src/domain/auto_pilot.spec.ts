import { RobotOrientation } from "./robot_orientation";
import { Robot } from "./robot";
import { Map } from "./map";
import { AutoPilot } from "./auto_pilot";
import { PilotCommands } from "./pilot_commands";

describe('AutoPilot', () => {
    it('should create an AutoPilot', async () => {
        const North = new RobotOrientation('N');
        const robot = new Robot({x:5,y:10}, North);
        const map = new Map({x: 10, y:10});
        const autoPilot = new AutoPilot(map);
        autoPilot.deployRobot(robot);

        expect(autoPilot.report()).toEqual('5 10 N');
    });

    it('should indicate if robot was Lost', async () => {
        const North = new RobotOrientation('N');
        const robot = new Robot({x:1,y:1}, North);
        const map = new Map({x: 1, y:1});
        const autoPilot = new AutoPilot(map);
        autoPilot.deployRobot(robot);

        autoPilot.moveRobot(PilotCommands.F);
        expect(autoPilot.report()).toEqual('1 1 N LOST');
    });

    it('should fail if robot is not deployed and try to report', async () => {
        const map = new Map({x: 10, y:10});
        const autoPilot = new AutoPilot(map);

        expect(
            () => { autoPilot.report(); }
        ).toThrow(Error); 
    });

    it('should fail if robot is not deployed and try to move it', async () => {
        const map = new Map({x: 10, y:10});
        const autoPilot = new AutoPilot(map);

        expect(
            () => { autoPilot.moveRobot(PilotCommands.F); }
        ).toThrow(Error);
    });
});