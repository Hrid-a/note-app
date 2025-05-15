
import {PrismaClient} from '@prisma/client'
import {faker} from '@faker-js/faker'
import {UniqueEnforcer} from 'enforce-unique'

const prisma = new PrismaClient();
const emailEnforcer = new UniqueEnforcer();

const createRandomUser = ()=>{
    const email = emailEnforcer.enforce(()=>{
        return (faker.internet.email())
    })
    return {
        email,
        username: faker.internet.username()
    }
}


async function seed() {
    console.log('seeding... 🌳🌳 ');
    console.time('🌳🌳 Database has  been seeded');

    console.time('🧹 Cleaned up the database');
    await prisma.user.deleteMany();
    console.timeEnd('🧹 Cleaned up the database');

    const totalUsers = 5;

    console.time(`👤 created ${totalUsers} users`);

    for (let index = 0; index < totalUsers; index++) {
        await prisma.user.create({
            data:{
                ...createRandomUser(),
                notes:{
                    create: Array.from({length: faker.number.int({min:1, max: 5})}).map(()=>({
                        title: faker.lorem.sentence(),
                        content: faker.lorem.paragraph()
                    }))
                }
            }
        })
    }
    console.timeEnd(`👤 created ${totalUsers} users`);

    console.time('created ahmed user')
    await prisma.user.create({
        data:{
            email: 'me@ahmedhrid.me',
            username: 'me',
            notes:{
                create: Array.from({length: faker.number.int({min: 1, max: 10})}).map(()=>({
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraph()
                }))
            }
        }
    })

    console.timeEnd('created ahmed user')
    console.timeEnd('🌳🌳 Database has  been seeded');

}

seed().catch(e =>{
    console.log(e);
}).finally(async ()=>{
    await prisma.$disconnect()
})
