
import {fastify} from 'fastify'
//import { Database} from './database.js'
import { DatabasePost } from './database-postgres.js'

const server = fastify()

//const database = new Database()

const database = new DatabasePost()

server.post('/videos', async(request, reply)=>{
    const {title,description,duration}= request.body


    
   await database.create({
        title:  title,
        description: description,
        duration: duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async(request, reply)=>{
    const search = request.query.search

    const videos = await database.list(search)
    return videos
    
})

server.put('/videos/:id', async(request,reply)=>{
    const {title,description,duration}= request.body
    const videoID = request.params.id

    await database.update(videoID,{
        title:  title,
        description: description,
        duration: duration,
    })

        return reply.status(204).send()
})

server.delete('/videos/:id', async(request,reply)=>{
    const videoID = request.params.id
    await database.delete(videoID)
    return reply.status(204).send

})

server.listen({
    port: process.env.PORT ?? 3333
})