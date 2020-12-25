let env = process.env.NODE_ENV || 'development'
require('dotenv').config()
console.log(process.env.MY_NAME)
let settings = require('./config/settings')[env]

const express = require('express')
var cors = require('cors')
const app = express()
var nodemailer = require('nodemailer');


app.use(cors())

app.get('/contactus', (req,res) => {
    const {from, message} = req.query
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'vikramsuryawanshi619.vs@gmail.com',
               pass: process.env.PASSWORD
           }
       });

       const mailOptions = {
        from: from, // sender address
        to: 'vickysurya7799@gmail.com', // list of receivers
        subject: 'Contact', // Subject line
        html: `<div style=" border: 1px solid #000;
                    width: 250px;
                    text-align: center;
                     padding: 1rem;">
                     <p style=" margin: 0;
                     padding-bottom: 1rem;">from : ${from}</p>
                     <p style=" margin: 0;
                     padding-bottom: 1rem;">${message}</p>
                     </div>`
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
     });


    
//     const msg = {
//         to: "vikramsuryawanshi619.vs@gmail.com",
//     from: from,
//     subject: "Contact",
//     html: `
//     <div style=" border: 1px solid #000;
//             width: 250px;
//             text-align: center;
//             padding: 1rem;">
//             <p style=" margin: 0;
//             padding-bottom: 1rem;">${message}</p>
//             </div>
//           `
//     }
//     sgMail.send(msg)
//     .then(() => {
//         res.send("success...")
//         console.log("ooookay")
//         console.log(message)
//         console.log(typeof from)
//         console.log(from)
//     })  
//     .catch((err)=> {
//         console.error(err)
//         res.status(500).send("ERROR")
//         console.log("errorrrr")
//     })
})

app.get('/admin/orders/pending', (req,res) => {
    const {to, id, price} = req.query
    
    // const msg = {
    //     to: to,
    //     from: "vikramsuryawanshi619.vs@gmail.com",
    //     subject: "Approved order",
    //     html: `
    //             <div style=" border: 1px solid #000;
    //                 width: 250px;
    //                 text-align: center;
    //                 padding: 1rem;">
    //               <h3>Thanks for ordering pizza from pizzaKhazana...</h3>
    //               <p style=" margin: 0;
    //                 padding-bottom: 1rem;">Your order id : ${id} is approved</p>
    //               <p style=" margin: 0;
    //                 padding-bottom: 1rem;">Please ready with cash ₹ ${price}</p>
    //             </div>
    //           `
    // }
    // sgMail.send(msg)
    // .then(() => {
    //     res.send("success...")
    //     console.log(to)
    //     console.log(id)
    //     console.log(price)
    // })  
    // .catch((err)=> {
    //     console.error(err)
    //     res.status(500).send("ERROR")
    // })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'USER EMAIL',
               pass: 'PASSWORD'
           }
       });

       const mailOptions = {
        from: 'SENDER EMAIL', // sender address
        to: to, // list of receivers
        subject: 'Order details', // Subject line
        html: `<div style=" border: 1px solid #000;
                         width: 250px;
                         text-align: center;
                         padding: 1rem;">
                       <h3>Thanks for ordering pizza from pizzaKhazana...</h3>
                       <p style=" margin: 0;
                         padding-bottom: 1rem;">Your order id : ${id} is approved</p>
                       <p style=" margin: 0;
                         padding-bottom: 1rem;">Please ready with cash ₹ ${price}</p>
                    </div>`
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
     });
})


require('./config/database')(settings)
require('./config/express')(app)
require('./config/routes')(app)
require('./config/passport')()

app.listen(settings.port)
console.log(`Server listening on port ${settings.port}...`)
