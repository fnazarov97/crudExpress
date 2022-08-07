let data = require('../data/data')
let fileName = 'user.json'

let listMemory = {
    users:[],
    posts:[]
}

//USER CRUD
/*function UserCreate(req, res) {
    let user = req.body
    if(!user.id    || 
       !user.fname || 
       !user.lname ||
       !user.age   ||
       !user.phone)
    {
        res.status(404).send('Empty fields!')
        return
    }
    user.createAt = new Date()
    listMemory.users.push(user)
    data.saveToFile(listMemory.users, fileName)
    res.status(200).send('file writed')
}*/

const UserCreate = (req, res) => {
    let user = req.body
    if(!user.id    || 
       !user.fname || 
       !user.lname ||
       !user.age   ||
       !user.phone)
    {
        res.status(404).send('Empty fields!')
        return
    }
    user.createAt = new Date()
    let found = listMemory.users.find(u => u.id==user.id)
    if(found){
        res.status(400).send("this users's id already exsist!")
        return
    }
    listMemory.users.push(user)
    res.status(200).send('Created successfully!')
}

const UsersRead = (req, res) => {
    if(!listMemory.users.length){
        res.status(404).send('Ma`lumot yoq' )
        return
    }
    res.status(200).send(listMemory.users)
}

const UserReadById = (req, res) => {
    let id = req.params.id
    let user = listMemory.users.find(u => u.id==id)
    if(!user){
        res.status(404).send(`This user's id:${id} not found!`)
    }
    res.status(200).send(user)
}

const UserUpdate = (req, res) => {
    let user = req.body
    let found = listMemory.users.find(u => u.id==user.id)
    if(!found){
        res.status(404).send("user not found!")
        return
    }
    let index = listMemory.users.indexOf(found)
    user.createAt = found.createAt
    user.updateAt = new Date()
    listMemory.users[index] = user
    res.status(200).send("successfully updated")
}

const UserDelete = (req, res) => {
    let user = req.body
    let found = listMemory.users.find(u => u.id==user.id)
    if(!found){
        res.status(404).send("user not found!")
        return
    }
    listMemory.users = listMemory.users.filter(u => u.id != user.id)
    res.status(200).send('User deleted!')
}

//POST CRUD
const PostCreate = (req, res) => {
    let post = req.body
    if(!post.id    ||
       !post.title ||
       !post.body  )
    {
        res.status(404).send('Empty fields')
        return
    }
    let found = listMemory.posts.find(p => p.id==post.id)
    if(found){
        res.status(400).send(`this post's id:${post.id} already exsist!`)
        return
    }
    post.createAt = new Date()
    post.count = 0
    listMemory.posts.push(post)
    res.status(200).send('Post created!')
}

const PostsRead = (req, res) => {
    if(!listMemory.posts.length){
        res.status(404).send('There are no posts yet!')
        return
    }
    listMemory.posts.forEach(p => p.count ++ )
    res.send(listMemory.posts)
}

const PostReadById = (req, res) => {
    let id = req.params.id
    let found = listMemory.posts.find( p => p.id == id)
    if(!found){
        res.status(404).send(`post this id: ${id} not found!`)
        return
    }
    let index = listMemory.posts.indexOf(found)
    listMemory.posts[index].count ++
    res.status(200).send(found)
}

const PostUpdate = (req, res) => {
    let post = req.body
    let found = listMemory.posts.find(p => p.id==post.id)
    if(!found){
        res.status(404).send("post not found!")
        return
    }
    let index = listMemory.posts.indexOf(found)
    post.createAt = found.createAt
    post.count = found.count
    post.updateAt = new Date()
    listMemory.posts[index] = post
    res.status(200).send("successfully updated")
}

const PostDelete = (req, res) => {
    let post = req.body
    let found = listMemory.posts.find(p => p.id==post.id)
    if(!found){
        res.status(404).send("post not found!")
        return
    }
    listMemory.posts = listMemory.posts.filter(p => p.id != post.id)
    res.status(200).send('Post deleted!')
}
module.exports = {
    UserCreate,
    UsersRead,
    UserReadById,
    UserUpdate,
    UserDelete,
    PostCreate,
    PostsRead,
    PostReadById,
    PostUpdate,
    PostDelete
}