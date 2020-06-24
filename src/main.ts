import { FileReader } from "./helpers/file_reader";
import { Robot } from "./domain/robot";
import { AutoPilot } from "./domain/auto_pilot";
import { Map } from "./domain/map";
import { RobotOrientation } from "./domain/robot_orientation";

const filename = process.argv[2];

let map:Map|null = null;
let robot:Robot|null = null;
let pilot:AutoPilot|null = null;

const setupMap = (x:number, y:number) => {
    return new Map({x, y});
}

const deployRobot = (x: number, y: number, orientation: string) => {
    const robotOrientation = new RobotOrientation(orientation);
    return new Robot({x,y}, robotOrientation);
}

try {
    const fileReader = new FileReader(filename);

    (async () => {
        let counter = 0;
        try {
            for await (const line of fileReader.getLines() ){
                let params = line.replace("\n","").split(' ');

                if( counter == 0 ) {
                    map = setupMap(Number(params[1]), Number(params[0]));
                    pilot = new AutoPilot(map);
                } else if ( !(counter % 2 == 0) ) {
                    robot = deployRobot(Number(params[0]), Number(params[1]), params[2]);
                    pilot?.deployRobot(robot);
                } else {
                    let commands = Array.from(params[0]);
                    
                    for (const command of commands) {
                        pilot?.moveRobot(command);
                    }
                    console.log(pilot?.report());
                }
                counter++;
            }
            

        } catch (error) {
            console.log(error.message);
        }
    })();
    
} catch(error) {
    console.log(error.message);
}
