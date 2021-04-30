var Userdb = require('../model/model')



// Create and save new user

exports.create = (req,res)=>{
    // validate
    if(!req.body){
        res.status(400).send({message:"Content cannot be Empty"})
        return;
    }
    // new user
    const user = new Userdb({
        name:req.body.name[0],
        email:req.body.name[1],

        gender:req.body.gender,
        status:req.body.status
    })
    console.log(user);
    // SAving data of user
    user.save(user).then(data=>{
        // res.send(data)
        res.redirect('/add-user');
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Some error occured while creating a create request"})
    })
}


// retrive and return data 

exports.find= (req,res)=>{

    if(req.query.id){
            const id = req.query.id;
            Userdb.findById(id).then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found user with id "+id})
                }else{
                    res.send(data)
                }
            }).catch(err=>{
                res.status(500).send({message:`Error retrving user with id ${id}`})
            })
    }else{
        Userdb.find().then(user=>{
        res.send(user)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error occured while retriving data"})
    })
    }
    
}


// Update a new user by userID

exports.update = (req,res)=>{
        if(!req.body){
            return res.status(400).send({message:'Data to update can not be empty'})
        }

const id = req.params.id;
Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot Update user with ${id}` || "Maybe user not found"})
    }else{
        res.send(data);
    }
}).catch(err=>{
    res.status(500).send({message:"Error Update user information"})
})

}

// Deleete a user with specified ID

exports.delete =(req,res)=>{
const id = req.params.id;
Userdb.findByIdAndDelete(id).then(data=>{
    if(!data){
        res.status(404).send({message:`cannot delete with ${id}` || "Maybe id is wrong"})
    }else{
        res.send({message:"User delted successfully"})
    }
}).catch(err=>{
    res.status(500).send({message:`could not delete user with id ${id}`})
});

}