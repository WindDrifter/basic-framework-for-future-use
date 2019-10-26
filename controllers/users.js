const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('', async (request, response, next) => {
  try{
    const allBlogs = await User.find({})
    response.json(allBlogs)
  }
  catch(exception){
    next(exception)
  }
})
  
usersRouter.post('', async (request, response, next) => {
  try{
    const body = request.body
    const user = new User(body)
    const result = await user.save()
    response.json(result)
  }
  catch(exception){
    next(exception)
  }
})


usersRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try{
    await User.findByIdAndDelete(id)
    response.json("Removal success")
  }
  catch(exception){
    next(exception)
  }

})

usersRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const data = request.body
  try{
    const result = await User.findByIdAndUpdate(id, data)
    response.json(result)
  }
  catch(exception){
    next(exception)
  }
})

usersRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  try{
    const result = await User.findById(id)
    response.json(result)
  }
  catch(exception){
    next(exception)
  }
})

module.exports = usersRouter