const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  let likesCounter = 0
  blogs.map(blog => {
    if ( blog.likes === null ) {
      likesCounter += 0
    } else {
      likesCounter += blog.likes
    }
  })
  return likesCounter
}

const favoriteBlog = blogs => {

  let havePopular = false
  const mostPopular = {
    title: null,
    author: null,
    likes: null
  }

  blogs.map(blog => {
    if ( blog.likes > mostPopular.likes ) {
      havePopular = true
      let hasMoreLikes = Math.max()
      //console.log(`status: ${havePopular} : likes: ${blog.likes}`);
      mostPopular.title = blog.title
      mostPopular.author = blog.author
      mostPopular.likes = blog.likes
    }
  })

  if ( blogs.length === 0 ) {
    return 'Sorry our users has been very busy at school'
  } else {
    return havePopular ? mostPopular : 'Sorry, found no blogs with like!'
  }

}

const mostBlogs = blogs => {
  if (blogs.length === 0) return 'No blogs written!'

  const authorsUnique = new Set(blogs.map(blog => blog.author))
  const authors = []

  authorsUnique.forEach(author => {
    const newAuthorObject = {
      name: author,
      blogsTotal: 0
    }
    blogs.map(blog => {
      if (blog.author === author) {
        newAuthorObject.blogsTotal += 1
      }
    })
    authors.push(newAuthorObject)
  })

  const bestAuthor = {
    name: null,
    blogs: null
  }
  authors.map(author => {
    if (author.blogsTotal > bestAuthor.blogs) {
      bestAuthor.name = author.name
      bestAuthor.blogs = author.blogsTotal
    }
  })

  return bestAuthor
}

const mostLikes = blogs => {
  if (blogs.length === 0) return 'No blogs written!'

  const authorsUnique = new Set(blogs.map(blog => blog.author))
  const authors = []

  authorsUnique.forEach(author => {
    const newAuthorObject = {
      name: author,
      likesTotal: 0
    }
    blogs.map(blog => {
      if (blog.author === author) {
        newAuthorObject.likesTotal += blog.likes
      }
    })
    authors.push(newAuthorObject)
  })

  const bestAuthor = {
    name: null,
    likes: null
  }
  authors.map(author => {
    if (author.likesTotal > bestAuthor.likes) {
      bestAuthor.name = author.name
      bestAuthor.likes = author.likesTotal
    }
  })

  return bestAuthor
}


/*const listWithFiveBlogs = [
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
]*/
//console.log('Most Blogs', mostLikes(listWithFiveBlogs));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}