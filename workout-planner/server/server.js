const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'server/workout.db'
});
async function authenticate(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
authenticate()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    }
})

const Exercise = sequelize.define('Exercise', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER
    }
})

User.sync();
Exercise.sync();

//get user
app.get('/workout-planner/user/:username/:password', async (req, res) => {
    const user = await User.findAll({
        where: {
            username: req.params.username,
            password: req.params.password
        }
    });
    res.json(user);
});

//create user
app.post('/workout-planner/user/', async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        type: req.body.type

    }
    User.create(user)
        .then(data =>{
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        });
    sequelize.sync();
});

//get all exercises
app.get('/workout-planner/exercises/:userId', async (req, res) => {
    const exercises = await Exercise.findAll({
        where:{
            userId: req.params.userId
        }
    });

    res.json(exercises);
});

//create exercise
app.post('/workout-planner/exercise/', async (req, res) => {
    const exercise = {
        name: req.body.name,
        description: req.body.description,
        userId: req.body.userId
    }
    Exercise.create(exercise)
        .then(data =>{
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Task."
        });
    });
    sequelize.sync();
});

//update exercise
app.put('/workout-planner/exercise/update', async (req, res) => {
    Exercise.update({
        name: req.body.name,
        description: req.body.description
    }, {
        where: {
            id: req.body.exercise.id
        }
    })

    sequelize.sync();
});

//delete exercise
app.delete('/workout-planner/exercise/delete/:id', async (req, res) => {
    await Exercise.destroy( {
        where: {
            id: req.params.id,
        }
    })
    res.json({ message: 'Exercise deleted' });
    sequelize.sync();
});

sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server started on port 3001');
    });
});