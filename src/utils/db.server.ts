import { PrismaClient } from "@prisma/client";
import chalk from 'chalk'
import { singleton } from "./singeltion";

type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
}

export const prisma = singleton('prisma', ()=>{
    const logTheshold = 25;

    const client = new PrismaClient({
        log:[
            {
                level:'query', emit:'event',
            },
            {
                level:'error', emit:'stdout',
            },
            {
                level:'info', emit:'stdout',
            },
            {
                level:'warn', emit:'stdout',
            }
        ]
    })


    client.$on('query', async (e: QueryEvent) =>{
        const duration = e.duration;
        const query = e.query;

        if(duration < logTheshold) return;

        const color = e.duration < logTheshold * 1.1 ? 
                        'green' : duration < logTheshold * 1.2 ? 
                            'blue': duration < logTheshold * 1.3 ?
                                'yellow' : duration < 1.4 ? 
                                    'redBright' : 'red';

        const durWithColor = chalk[color](`${duration} ms`);
        console.info(`prisma query - ${durWithColor} - ${query}`)
    })

    client.$connect();
    return client;
})