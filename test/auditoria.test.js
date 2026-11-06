// @vitest-environment jsdom

import { test, expect } from 'vitest'
import { loadApp, card, BOOKS } from './helpers.js'

test('un libro sin fecha de venta aparece como En venta', async () => {
    await loadApp({
        books: [
            {
                ...BOOKS[0],
                soldDate: ''
            }
        ]
    })

    const text = card(1).textContent

    expect(text).toContain('En venta')
    expect(text).not.toContain('Vendido el')
})