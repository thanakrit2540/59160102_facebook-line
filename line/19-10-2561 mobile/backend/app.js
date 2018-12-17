const express = require('express')
const line = require('@line/bot-sdk')
const cors = require('cors')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const config = {
    channelAccessToken: "nhigiYjmkj3HXRf90oK/uJAoMFXJijk54czzyZjroNgXVacnvPiXLh/mwINxNmN3DF6CRTKm+FYBfmVdIystevTVvZgIrMfLv8tDaflM7a2iByUYf8P55/kHZeyO04hLy37JUyeJAdHhrPff00qUlwdB04t89/1O/w1cDnyilFU=",
    channelSecret: "db04685811a72815fa8e78b8f48c63b7"
}
const client = new line.Client(config);
app.use(cors())
app.get('./', (req, res) => {
    res.send("Hello world")
})
app.post('/', line.middleware(config), (req, res) => {
    console.log(req.body)
    Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result))
})
app.post('/loginf',bodyParser.json(),(req,res) => {
    console.log(req.body)
    client.pushMessage('U6c1f891e225ffc12598890890d6b5202',{
        type: 'image',
        originalContentUrl:req.body.picture,
        previewImageUrl: req.body.picture  
    })
    client.pushMessage('U6c1f891e225ffc12598890890d6b5202',{
        type: 'text',
        text: "New Register: "+req.body.name 
    })
    client.pushMessage('U6c1f891e225ffc12598890890d6b5202',{
        type: 'text',
        text: "Email : "+req.body.email 
    })
})
function handleEvent(event){
    if(event.type != 'message' || event.message.type !== 'text'){
        return Promise.resolve(null)
    }
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    })
}

    app.listen(port, () => console.log(`App runnubg ${port}`))