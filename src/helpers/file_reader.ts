import { ReadStream, createReadStream, accessSync, constants } from 'fs';

export class FileReader {
    private filename:string;
    private readStream:ReadStream;

    constructor(filename: string) {
        this.filename = filename;
        
        try {
            accessSync(this.filename, constants.R_OK);
        } catch (error) {
            throw new Error(`File ${filename} does not exist, or cannot be read.`);
        }

        this.readStream = createReadStream(filename, {
            flags: 'r',
            encoding: 'ascii',
            start: 0,
            end: 100,
            highWaterMark: 16
        });
    }

    async * getLines(){
        for await (const line of this.chunksToLines(this.readStream)) {
            yield line;
        }
    }

    private async * chunksToLines(chunksAsync:any) {
        let previous = '';
        for await (const chunk of chunksAsync) {
          previous += chunk;
          let eolIndex;
          while ((eolIndex = previous.indexOf('\n')) >= 0) {
            const line = previous.slice(0, eolIndex+1);
            yield line;
            previous = previous.slice(eolIndex+1);
          }
        }
        if (previous.length > 0) {
          yield previous;
        }
    }
}
