const isValidEmailPassword = (req, res, next) => {
    console.log(`---> isValidEmailPassword section!`)
    // console.log(req.body)
    try {
        const { email, password } = req.body;

        const reEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(!reEmail.test(email)){
            return res.status(401).json({
                Error: 'Email is not valid.'
            })
        }
        const rePassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        if(password && !rePassword.test(password)){
            return res.status(401).json({
                Error: 'Password should contain atleast 8 characters with 1 uppercase, 1 lowercase letter and 1 number.'
            })
        }
        next()
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            Error: 'Internal server error.'
        })
    }
};

module.exports = isValidEmailPassword;