/**
 * @vitest-environment jsdom
 */
import { test, expect, afterEach } from "vitest";
import ErrorList from "./ErrorList";
import {cleanup, render, screen} from '@testing-library/react'
import { faker } from "@faker-js/faker";

afterEach(cleanup)

test('shows nothing when an empty list is given ',async ()=>{
    await render(<ErrorList />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
})

test('shows a single error', async()=>{
    const errors = [faker.lorem.words(2)];
    await render(<ErrorList errors={errors} />)
    const errorEls = screen.getAllByRole('listitem')
    expect(errorEls.map(el => el.textContent)).toEqual(errors)
})

test('shows multiple errors', async()=>{
    const errors = [faker.lorem.words(2), faker.lorem.words(2)]
    await render(<ErrorList errors={errors} />)
    const errorEls = screen.getAllByRole('listitem')
    expect(errorEls).toHaveLength(errors.length)
    expect(errorEls.map(el => el.textContent)).toEqual(errors)
})

test('cam cope falsy values', async()=>{
    const errors = [undefined, faker.lorem.words(2), null, faker.lorem.words(2), '']
    await render(<ErrorList errors={errors} />)
    const errorEls = screen.getAllByRole('listitem')
    expect(errorEls).toHaveLength(errors.filter(Boolean).length)
    expect(errorEls.map(el => el.textContent)).toEqual(errors.filter(Boolean))
})

