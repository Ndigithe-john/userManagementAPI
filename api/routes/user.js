// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const User = require("../models/user");
// const jwt =require('jsonwebtoken')
// router.post("/signup", (req, res) => {
//     User.find({email:req.body.email})
//     .exec()
//     .then(user=>{
//         if(user.length>=1){
//             return res.status(409).json({
//                 message:'Email exists'
//             })
//         }else{
//             bcrypt.hash(req.body.email, 10, (err, hash) => {
//                 if (err) {
//                   return res.status(500).json({
//                     error: err,
//                   });
//                 } else {

//                   user
//                     .save()
//                     .then((results) => {
//                       res.status(201).json({
//                         message: "User created",
//                       });
//                     })
//                     .catch((err) => {
//                       console.log(err);
//                       res.status(500).json({
//                         error: err,
//                       });
//                     });
//                 }
//               });
//         }
//     })

// });

// router.post('/login',(req,res)={
//   User.find({email:req.body.email})
//   .exec()
//   .then(user=>{
//     if(user.length<1){
//       return res.status(401).json({
//         message:'Auth failed'
//       })
//     }
//     bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
//       if(err){
//         return res.status(401).json({
//           message:'Auth failed'
//         })
//       }
//       if (result)
// {
//   jwt.sign({
//     email:user[0],
//     userId: user[0]._id
//   })
//   return res.status(200).json({
//      message:'Auth Successful'
//   })
// }
// res.status(401).json({
//   message:'Auth failed'
// })

//     })
//   })
//   .catch(err=>{
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//   })
// })

// router.delete('/:userID',(req,res)=>{
//     User.remove({id: req.params.id})
//     .exec()
//     .then(results=>{
//         res.status(200).json({
//             message:'User deleted'
//         })
//         })
//         .catch(err=>{
//             console.log(err);
//         res.status(500).json({
//             error:err
//         }
//         )
//     })
// })

// module.exports = router;
