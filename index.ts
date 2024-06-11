import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
app.use(cookieParser());


const users = [
    {
        id: 1,
        email: "email@email.com",
        password: "email"

    },
    {
        id: 2,
        email: "msg@msg.com",
        password: "msg"

    }
]

//allow urlencoded data to be submitted using middleware
app.use(express.urlencoded({ extended: true }))
//allow cookies to be interpreted
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//LOG IN
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

// create a login POST route that accepts a password and sets an authentication token 
// as a Cookie if the login is valid
app.post('/login', (req, res) => {
    const testuseremail = users.find((user) => user.email == req.body.email)
    const testuserpassword = users.find((user) => user.password == req.body.password)
    if (req.body.email === testuseremail?.email && req.body.password === testuserpassword?.password) {

        res.cookie('authToken', 'id', { httpOnly: true });
        return res.send('you are now logged in');
    }
    else {
        return res.send('incorrect password');
    }
});


// create a logout route that clears all the cookies
app.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    return res.redirect('/login');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000, http://localhost:3000');
});