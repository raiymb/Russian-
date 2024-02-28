const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const User = require('./models/User');
const Item = require('./models/Item');
const Quiz =require("./models/Quiz");
const Reading = require("./models/Reading"); 
const { isAuthenticated, hasRole } = require('./middleware/authMiddleware');

const itemRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const translationRoutes = require('./routes/translation');
const languageSelection = require('./middleware/languageSelection');
const authController =require("./controllers/authController")

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public')); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'sakjngk4g5wrgvwqr94wfqw5wq5ef4',
    resave: false,
    saveUninitialized: true
}));

mongoose.connect('mongodb+srv://admin:admin@raiymbekcluster.ls69hzs.mongodb.net/russian?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(languageSelection);


app.use('/auth', authRoutes);
app.use('/items', isAuthenticated, itemRoutes);
app.use('/api', isAuthenticated, translationRoutes);

app.get('/', (req, res) => {
    res.render('login', { t: req.locale });
});

app.get('/main',isAuthenticated, async (req, res) => {
  const items = await Item.find({ deletedAt: null });
    res.render('main',  { items });
});

app.get('/item', async (req, res) => {
    const items = await Item.find({ deletedAt: null });
    res.render('item', { items });
});

app.get('/logout', authController.logout);

app.get('/admin', isAuthenticated, hasRole('admin'), async (req, res) => {
  const items = await Item.find({ deletedAt: null });
    res.render('admin', { items });
});

app.get('/quiz', async (req, res) => {
    try {
        const quizzesPromise = Quiz.aggregate([{ $sample: { size: 18 } }]);
        const readingPromise = Reading.aggregate([{ $sample: { size: 1 } }]);

        const [quizzes, readings] = await Promise.all([quizzesPromise, readingPromise]);

        if (readings[0] && readings[0].questions.length > 6) {
            readings[0].questions = readings[0].questions.sort(() => 0.5 - Math.random()).slice(0, 6);
        }

        const mixedQuestions = [...quizzes, ...[readings[0]]].sort(() => 0.5 - Math.random());

        res.render('quiz', { mixedQuestions });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


const itemController = require('./controllers/adminContoller');

app.post('/add-item', async (req, res) => {
  try {
    const { nameEn, nameRu, descriptionEn, descriptionRu, images } = req.body;

    const newItem = new Item({
        name: { en: nameEn, ru: nameRu },
        description: { en: descriptionEn, ru: descriptionRu },
        images,
        createdAt: new Date()
    });

    await newItem.save();

    res.status(201).send('Item added successfully');
} catch (error) {
    res.status(500).send(error.message);
}
});
app.put('/update-item/:itemId', itemController.updateItem);
app.delete('/delete-item/:itemId', itemController.deleteItem);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
