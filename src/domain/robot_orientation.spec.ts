import { RobotOrientation } from "./robot_orientation";

describe('Robot', () => {
    it('should create a Robot Orientation', async () => {
        const North = new RobotOrientation('N');
        const East = new RobotOrientation('E');
        
        expect(North).not.toBe(East);
        expect(North.Name()).toEqual('N');
    });

    it('should fail if the name is not valid', async () => {
        expect(
            () => { new RobotOrientation('Y'); }
        ).toThrow(Error);
    });

    it('should return the next Orientation clockwise ', async () => {
        const North = new RobotOrientation('N');
        const East = North.clockwise();
        const South = East.clockwise();
        const West = South.clockwise();
        const newNorth = West.clockwise();

        expect(East.Value()).toBe(North.Value() +1);
        expect(South.Value()).toBe(North.Value() +2);
        expect(West.Value()).toBe(North.Value() +3);
        expect(newNorth.Value()).toBe(North.Value());
    });

    it('should return the next Orientation counter-clockwise ', async () => {
        const North = new RobotOrientation('N');
        const West = North.counterClockwise();
        const South = West.counterClockwise();
        const East = South.counterClockwise();
        const newNorth = East.counterClockwise();

        expect(East.Value()).toBe(North.Value() +1);
        expect(South.Value()).toBe(North.Value() +2);
        expect(West.Value()).toBe(North.Value() +3);
        expect(newNorth.Value()).toBe(North.Value());
    });
});