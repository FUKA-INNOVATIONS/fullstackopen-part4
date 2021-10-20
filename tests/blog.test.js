const blog = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const listWithOneBlogNullLikes = [
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: null,
    __v: 0
  }
]

const listWithOneBlogNoLikes = [
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 0,
    __v: 0
  }
]

const listWithFiveBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  }
]

describe('Dummy test (4.3: apufunktioita ja yksikkötestejä, step1)', () => {
  test('dummy returns one', () => {
    expect(blog.dummy([])).toBe(1)
  })
})

describe('Blog post likes counter (4.4: apufunktioita ja yksikkötestejä, step2)', () => {

  test('dummy returns one', () => {
    expect(blog.dummy([])).toBe(1)
  })

  test('of empty blog is zero', () => {
    expect(blog.totalLikes([])).toBe(0)
  })

  test('of one blog with null likes should returns zero', () => {
    expect(blog.totalLikes(listWithOneBlogNullLikes)).toBe(0)
  })

  test('when list has only one blog with total of 2 likes', () => {
    expect(blog.totalLikes(listWithOneBlog)).toBe(2)
  })

  test('when list has only one blog with total of 0 likes', () => {
    expect(blog.totalLikes(listWithOneBlogNoLikes)).toBe(0)
  })

  test('list of 5 blog posts with total of 34 likes', () => {
    expect(blog.totalLikes(listWithFiveBlogs)).toBe(34)
  })

})

describe('Most popular blog: 4.5* (apufunktioita ja yksikkötestejä, step3)', () => {

  test('List of 5 blogs. Most popular title: Canonical string reduction by Edsger W. Dijkstra', () => {
    expect(blog.favoriteBlog(listWithFiveBlogs)).toStrictEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })

  test('List of One Blog with no likes should return (Sorry, found no blogs with like!) ', () => {
    expect(blog.favoriteBlog(listWithOneBlogNoLikes)).toBe('Sorry, found no blogs with like!')
  })

  test('List of One Blog with likes of NULL should return (Sorry, found no blogs with like!) ', () => {
    expect(blog.favoriteBlog(listWithOneBlogNullLikes)).toBe('Sorry, found no blogs with like!')
  })

  test('List of zero blogs should return (Sorry our users has been very busy at school) ', () => {
    expect(blog.favoriteBlog([])).toBe('Sorry our users has been very busy at school')
  })
})

describe('Author with most blogs (4.6*: apufunktioita ja yksikkötestejä, step4)', () => {
  test('list of Five blogs, with 2 equaly best authors, retuns only 1 author', () => {
    expect(blog.mostBlogs(listWithFiveBlogs)).toStrictEqual({ name: 'Edsger W. Dijkstra', blogs: 2 })
  })

  test('list 1 blog', () => {
    expect(blog.mostBlogs(listWithOneBlog)).toStrictEqual({ name: 'Robert C. Martin', blogs: 1 })
  })

  test('list of zero blogs returns (No blogs written!)', () => {
    expect(blog.mostBlogs([])).toBe('No blogs written!')
  })
})

describe('Author with most likes (4.7*: apufunktioita ja yksikkötestejä, step5)', () => {

  test('list of Five blogs, best author: Edsger W. Dijkstra with 17 likes', () => {
    expect(blog.mostLikes(listWithFiveBlogs)).toStrictEqual({ name: 'Edsger W. Dijkstra', likes: 17 })
  })

  test('list 1 blog with 2 likes', () => {
    expect(blog.mostLikes(listWithOneBlog)).toStrictEqual({ name: 'Robert C. Martin', likes: 2 })
  })

  test('list of zero blogs returns (No blogs written!)', () => {
    expect(blog.mostLikes([])).toBe('No blogs written!')
  })

})
