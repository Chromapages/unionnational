import { describe, expect, it, vi } from 'vitest'

vi.mock('sanity', () => ({ defineField: (field: unknown) => field, defineType: (schema: unknown) => schema }))
import { pricingPage } from './pricingPage'

type Validator = (document: { _id: string }, context: { getClient: ReturnType<typeof vi.fn> }) => Promise<true | string>
const validate = (pricingPage.validation as unknown as (rule: { custom: (validator: Validator) => Validator }) => Validator)({ custom: validator => validator })

describe('pricing page singleton authoring', () => {
    it.each([0, 1])('excludes both versions of the current record and blocks %s other records', async count => {
        const fetch = vi.fn().mockResolvedValue(count)
        const withConfig = vi.fn().mockReturnValue({ fetch })
        const getClient = vi.fn().mockReturnValue({ withConfig })
        const result = await validate({ _id: 'drafts.real-editor-id' }, { getClient })
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('!(_id in [$id, $draftId])'), { id: 'real-editor-id', draftId: 'drafts.real-editor-id' })
        expect(withConfig).toHaveBeenCalledWith({ useCdn: false, perspective: 'raw' })
        expect(result).toBe(count === 0 ? true : 'A pricing page already exists. Edit that record instead of publishing a duplicate.')
    })

    it('blocks publication when uniqueness cannot be verified', async () => {
        const fetch = vi.fn().mockRejectedValue(new Error('Synthetic read failure'))
        const getClient = vi.fn().mockReturnValue({ withConfig: () => ({ fetch }) })
        expect(await validate({ _id: 'real-editor-id' }, { getClient })).toBe('Cannot verify that this is the only pricing page. Retry before publishing.')
    })
})
