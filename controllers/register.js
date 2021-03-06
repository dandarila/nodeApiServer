const handleRegister = (req, res, db, bcrypt)  => {
  const { email, name, password } = req.body;
  if(!email || !name || !password) {
    console.log(req.body)
   return res.status(400).json('incorrect form submission');
  }
  console.log(req.body)
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
        .returning('*')
          .insert({
            email: loginEmail[0],
            name: name, 
            joined: new Date()
          })
          .then(user => {
            res.json(user[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("unable to register, user exists", err))
}

module.exports =  {
  handleRegister: handleRegister
}