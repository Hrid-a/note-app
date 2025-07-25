import {test as base} from '@playwright/test'
import { createUser } from '../prisma/seed';


const test = base.extend<{
    insertUser():Promise<{
        id: string,
        email: string,
    }>
}>(
    {
        insertUser: async({}, use)=>{
            let userId:string | undefined;
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            await use(async ()=>{
                const user = await createUser({email: 'tester@gmail.com',username: 'test-killer', password: 'testing22'});

                userId = user?.id

                return user;
            })

            if(userId){
                // delete the userWith the id userId
            }

        }
    }
)

const {expect} = test;


test('the user login', async ({page, insertUser})=>{

    const user = await insertUser();
    console.log({user})
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Welcome to Note' })).toBeVisible()

})