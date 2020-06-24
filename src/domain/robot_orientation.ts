export class RobotOrientation {
    private readonly value: number;
    private readonly name: string;

    private validNames = [
        'N', 'E', 'S', 'W'
    ];

    constructor(name: string) {
        const index = this.validNames.indexOf(name);
        if( index < 0) {
            throw new Error(`The orientation is not valid. Valid optoins: ${this.validNames.values()}`);
        }
        this.value = index;
        this.name = name;
    }

    public Name(): string {
        return this.name;
    }

    public Value(): number {
        return this.value;
    }

    public clockwise(): RobotOrientation{
        let nextValue:number = this.value + 1;
        if( nextValue == this.validNames.length ) 
            nextValue = 0;
        return new RobotOrientation(this.validNames[nextValue]);
    }

    public counterClockwise(): RobotOrientation{
        let prevValue:number = this.value - 1;
        if( prevValue < 0 )
            prevValue = this.validNames.length -1;

        return new RobotOrientation(this.validNames[prevValue]);
    }
}