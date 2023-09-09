if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");

const cors = require("cors");
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const db = require('./config/dbConfig')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.post('/signup', async (req, res) => {
    try {
        let hashpass = " ";

        if (!req.body.password || !req.body.abhaid || !req.body.email) {
            throw new Error('All fields must be filled');
        }

        if(!validator.isEmail(req.body.email))
        {
            throw new Error('Enter valid email')
        }

        if (!validator.isStrongPassword(req.body.password, { minLength: 8, minUppercase: 0, minSymbols: 0 })) {
            throw new Error('Password not strong enough');
        }

        if(req.body.abhaid <= 10000000000000 || req.body.abhaid >= 99999999999999)
        {
            throw Error('Enter a valid Abha Id')
        }

        const query = 'SELECT * FROM USERS WHERE abha_id = $1';
        const { rows } = await db.query(query, [req.body.abhaid]);

        if (rows.length !== 0) {
            throw new Error('ABHA ID already in use');
        }

        const salt = await bcrypt.genSalt(12);
        hashpass = await bcrypt.hash(req.body.password, salt);

        const values = [hashpass, req.body.abhaid, req.body.name];

        db.query('INSERT INTO USERS(email, abha_id, password) VALUES ($3, $2, $1)', values, (error, results) => {
            if (error) {
                return res.status(500).json({ error: `Error in insertion: ${error}` });
            }

            const token = createToken(req.body.abhaid);
            return res.json({ success: true, authToken: token });
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

app.post('/login' , async(req , res) =>{

    try {
        
        if (!req.body.abhaid || !req.body.password) {
            throw Error('All fields must be filled')
        }

        if(req.body.abhaid <= 10000000000000 || req.body.abhaid >= 99999999999999)
        {
            throw Error('Enter a valid Abha Id')
        }

        const values = [req.body.abhaid]

        const query = 'SELECT * FROM USERS WHERE abha_id = $1';

        const { rows } = await db.query(query, values);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const dbhasp = rows[0].password;

        const match = await bcrypt.compare(req.body.password, dbhasp);

        if (!match) {
            return res.status(400).json({ error: 'Password incorrect' });
        } else {
            const token = createToken(req.body.abhaid);
            return res.json({ success: true, authToken: token });
        }

    } catch (error) {
        return res.status(400).json({error : error.message})
    }
})

app.post('/myverify' , async(req,res) =>{
    try {
        var decoded = jwt.verify(req.body.token , process.env.SECRET)
        return res.json({success : true})
    } catch (error) {
        return res.status(400).json({success : false})      
    }
})

app.listen(3456, () => {
    console.log("Listening on port 3456");
})