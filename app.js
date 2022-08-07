const PORT = 4001
const express = require('express')
const app = express()

let Middleware = require('./middleware/middleware')
let Controllers = require('./controllers/controllers')

app.use(express.json())

//LOGGER
app.use('/', Middleware.LoggerMiddeware)

//AUTHORIZATION
app.use('/api/user', Middleware.Auth)

//FOR CHECK
app.get('/', (req, res) => {
    res.send('Home page!')
})

//USERS
app.post('/api/user', Controllers.UserCreate)
app.get('/api/user', Controllers.UsersRead)
app.get('/api/user/:id', Controllers.UserReadById)
app.put('/api/user', Controllers.UserUpdate)
app.delete('/api/user', Controllers.UserDelete)

//POSTS
app.post('/api/post', Controllers.PostCreate)
app.get('/api/post',Controllers.PostsRead)
app.get('/api/post/:id', Controllers.PostReadById)
app.put('/api/post', Controllers.PostUpdate)
app.delete('/api/post', Controllers.PostDelete)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})