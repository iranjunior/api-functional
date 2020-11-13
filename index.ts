import express from 'express'

const app = express()


app.listen(3456, () => {
    console.log('Running at port ', 3456)
})