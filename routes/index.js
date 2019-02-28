import express from 'express'

module.exports = (app) => {
    app.get('/', (req, res) => {
        console.log('successfully connected');
    })
}