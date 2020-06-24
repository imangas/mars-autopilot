import { Map } from "./map";

describe('Map', () => {
    it('should create a map', async () => {
        const map = new Map({x:1,y:1});
        expect(map).toBeInstanceOf(Map);
    });

    it('should fail if dimenions are negative', async () => { 
        expect(
            () => { new Map({x:-10,y:1}); }
        ).toThrow(Error);
    }); 
    
    it('should detect if object IN map', async () => { 
        const map = new Map({x:10,y:10});

        expect(map.isCoordInMap({x:0, y:0})).toBeTruthy();
        expect(map.isCoordInMap({x:1, y:1})).toBeTruthy();
        expect(map.isCoordInMap({x:10, y:10})).toBeTruthy();
        expect(map.isCoordInMap({x:11, y:1})).toBeFalsy();
        expect(map.isCoordInMap({x:1, y:11})).toBeFalsy();
        expect(map.isCoordInMap({x:20, y:20})).toBeFalsy();
        expect(map.isCoordInMap({x:-1, y:1})).toBeFalsy();
    });
});