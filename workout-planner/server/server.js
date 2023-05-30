const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const cors = require('cors');
const { QueryTypes } = require('sequelize');
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


const Workout = sequelize.define('Workout', {
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
User.hasOne(Exercise);
User.hasOne(Workout);
Exercise.belongsTo(User, { foreignKey: 'userId' });
Workout.belongsTo(User, { foreignKey: 'userId' });

User.sync();
Exercise.sync();
Workout.sync();

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
        include: [
            {
                model: User,
                where: Sequelize.or(
                    { id: req.params.userId },
                    { type: 'TRAINER' }
                ),
            },
        ],
    });
    // const exercises= sequelize.query("SELECT * from Exercises W inner join Users U on W.userId=U.id where W.userId=4 or U.type='TRAINER'", { type: QueryTypes.SELECT });

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
                err.message || "Some error occurred while creating the exercise."
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
    }).then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Exercise."
        });
    });

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

//get all workouts
app.get('/workout-planner/workouts/:userId', async (req, res) => {
    const workouts = await Workout.findAll({
        include: [
            {
                model: User,
                where: Sequelize.or(
                    { id: req.params.userId },
                    { type: 'TRAINER' }
                ),
            },
        ],
    });

    // const workouts= sequelize.query("SELECT * from Workouts W inner join Users U on W.userId=U.id where W.userId="+req.params.userId+ " or U.type='TRAINER'", { type: QueryTypes.SELECT });

    res.json(workouts);
});

//create workout
app.post('/workout-planner/workout/', async (req, res) => {
    const workout = {
        name: req.body.name,
        description: req.body.description,
        userId: req.body.userId
    }
    Workout.create(workout)
        .then(data =>{
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the workout."
        });
    });
    sequelize.sync();
});

//update workout
app.put('/workout-planner/workout/update', async (req, res) => {
    Workout.update({
        name: req.body.name,
        description: req.body.description
    }, {
        where: {
            id: req.body.workout.id
        }
    }).then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the workout."
        });
    });

    sequelize.sync();
});

//delete exercise
app.delete('/workout-planner/workout/delete/:id', async (req, res) => {
    await Workout.destroy( {
        where: {
            id: req.params.id,
        }
    })
    res.json({ message: 'Workout deleted' });
    sequelize.sync();
});

sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server started on port 3001');
    });
});