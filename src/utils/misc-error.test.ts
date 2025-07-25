import { faker } from '@faker-js/faker'
import { test, expect, vi, beforeEach, type MockInstance} from 'vitest'
import { getErrorMessage } from './misc.utils'




type ConsoleErrorFunction = (...args: Parameters<typeof console['error']>) => ReturnType<typeof console['error']>;

let consoleError: MockInstance<ConsoleErrorFunction>

beforeEach(()=>{
    consoleError = vi.spyOn(console, 'error');
    consoleError.mockImplementation(()=>{});
})

// afterEach(()=>{
//     consoleError.mockRestore()
// })

test('test the error ', ()=>{
    const message = faker.lorem.words(2)
    const error = new Error(message)
    expect(getErrorMessage(error)).toBe(message)
})


test('udefined fallback to unkwon', ()=>{

    expect(getErrorMessage(undefined)).toBe('Unknown Error');
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledWith('Unable to get error message for error', undefined)
})


test('passing a string error', ()=>{
    const message = faker.lorem.words(2);
    expect(getErrorMessage(message)).toBe(message)
})