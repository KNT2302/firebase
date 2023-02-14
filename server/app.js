var express = require('express')

var FCM = require('fcm-node')

var app = express()

var port = 3000
var SERVER_KEY = "AAAAUhHgYXE:APA91bE7LWKLslUIL_PfMyFeZWnko8cIF03U_7WF5A-SbsXYIPsolC8KxOf4xnkBiLK3xWHdmGe4BupCyvY1H4-hb9ikrN8l3xg7ohTOfwSDf6W4odfaKSomp2wT-jPq1dVE72OGoS1U"

app.listen(port,()=>{
  console.log('Listening on port', port)
})

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.post("/fcm", async(req, res,next)=>{
  try{
    let fcm = new FCM(SERVER_KEY)

    let message = {
      to: 'dJCJ4uFUD-hRM-yBsCkMVg:APA91bHda1v7we1mkuMlBNAOKyTIyQeKVpA3XzYdI6lV0_WvrqiJewVIekFv8P5yGQoY_jnSFmlNxgAxDMRb3wEKkpaF08FUA3o6-NMqOyiYwDLx1GplFlCV5mW_q71tK7nBVHWNg2Me',
      notification: {
        title: req.body.title,
        body: req.body.body,
        sound: 'default',
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      }
    }

    fcm.send(message, (err, response)=>{
      if(err){
        next(err)
      }else{
        res.json(response)
      }
    })
  }catch(err){
    next(err)
  }
})

