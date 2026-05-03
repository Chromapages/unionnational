import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getGhlPosts } from './blogs'

// Mock the auth module
vi.mock('./auth', () => ({
  getGhlAccessToken: vi.fn().mockResolvedValue('fake-token'),
}))

describe('GHL Blogs Utility', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    process.env.GHL_LOCATION_ID = 'fake-location'
  })

  it('maps raw GHL posts to canonical format', async () => {
    const mockRawData = {
      posts: [
        {
          id: 'post-1',
          title: 'Test Post',
          slug: 'test-post',
          description: 'A test description',
          body: '<p>Test body</p>',
          imageUrl: 'https://test.com/img.jpg',
          publishedAt: '2026-05-01T12:00:00Z',
          author: { name: 'Test Author' },
          categories: ['Category 1', { name: 'Category 2' }],
        },
      ],
      total: 1,
    }

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockRawData,
    } as Response)

    const result = await getGhlPosts('blog-1')

    expect(result.posts).toHaveLength(1)
    const post = result.posts[0]
    expect(post.id).toBe('post-1')
    expect(post.title).toBe('Test Post')
    expect(post.excerpt).toBe('A test description')
    expect(post.content).toBe('<p>Test body</p>')
    expect(post.categories).toEqual(['Category 1', 'Category 2'])
    expect(post.authorName).toBe('Test Author')
  })

  it('returns empty list and total 0 on API error', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Error' }),
    } as Response)

    const result = await getGhlPosts('blog-1')
    expect(result.posts).toHaveLength(0)
    expect(result.total).toBe(0)
  })

  it('returns mock data in development when credentials missing', async () => {
    delete process.env.GHL_LOCATION_ID
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    const result = await getGhlPosts('blog-1')
    expect(result.posts.length).toBeGreaterThan(0)
    expect(result.total).toBeGreaterThan(0)

    process.env.NODE_ENV = originalNodeEnv
  })
})
