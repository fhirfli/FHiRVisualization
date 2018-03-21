module.exports = (env, router) => {
    const sanitizeError = require('../../sanitizeError');
    const Data = require('../../db/models/data');
    const Goal = require('../../db/models/goal').Goal;
    const GOAL_PERIODS = require('../../db/models/goal').GOAL_PERIODS;

    // utility function to sanitize a goal, removing sensitive, application-critical data (_ids, timestamps)
    let sanitizeGoal = (goal) => {
        return {
            dataType: goal.dataType,
            name: goal.name,
            colour: goal.colour,
            value: goal.value,
            period: goal.period
        };
    };

    // Reusable callback which, when given a request object, returns all goals for the user
    let returnAllGoals = (req, res) => {
        Goal.find({user: req.user._id}, (err, goals) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            let result = goals.map(sanitizeGoal);

            res.status(200).json(result);
        });
    };

    // GET requests to goal retrieves all user goals
    router.get('/goals', returnAllGoals);

    // POST requests to goal adds a new goal document to the database
    router.post('/goals', (req, res) => {
        const {name, dataType, colour, value, period} = req.body;

        // check request parameters
        if (!name || !dataType || !value || !colour || !period) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!Data.VALID_DATA_TYPES.includes(dataType)) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }
        if (!GOAL_PERIODS.includes(period)) {
            return res.status(400).json({error: 'INVALID_PERIOD'});
        }
        if (!Data.COLORS.includes(colour)) {
            return res.status(400).json({error: 'INVALID_COLOUR'});
        }


        // Check that a goal by the new goal's name is not present on the system already
        Goal.findOne({user: req.user._id, name: name}, (err, goal) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            // Return 400 as the user has attempted to add a new goal of the same name
            if (goal)
                return res.status(400).json({error: 'GOAL_EXISTS'});

            // otherwise, create a new goal using the data provided by the user
            goal = new Goal({
                user: req.user._id,
                dataType,
                name,
                colour,
                value,
                period
            });

            goal.save((err, saved) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                return res.status(200).json(sanitizeGoal(saved));
            });
        });
    });


    // PUT requests to goals can update the colours, datatypes, and periods of the goal
    router.put('/goals', (req, res) => {
        const {name, dataType, colour, value, period} = req.body;

        // check request parameters
        if (!name || !dataType || !colour || !value || !period) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!Data.VALID_DATA_TYPES.includes(dataType)) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }
        if (!GOAL_PERIODS.includes(period)) {
            return res.status(400).json({error: 'INVALID_PERIOD'});
        }
        if (!Data.COLORS.includes(colour)) {
            return res.status(400).json({error: 'INVALID_COLOUR'});
        }

        // Check that the goal actually exists on the system
        Goal.findOne({user: req.user._id, name: name}, (err, goal) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            // return 404 if the goal does not exist on the system
            if (!goal)
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});

            // update the goal to match the user supplied values
            goal.dataType = dataType;
            goal.value = value;
            goal.period = period;
            goal.colour = colour;

            goal.save((err, saved) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                return res.status(200).json(sanitizeGoal(saved));
            });
        });

    });

    // DELETE requests to goals remove the goal document from the database
    router.delete('/goals', (req, res) => {
        const {name} = req.body;

        // check request parameters
        if (!name) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }

        // Use the MongoDB findAndRemove function to remove the document in an optimized fashion
        Goal.findOneAndRemove({user: req.user._id, name: name}, (err, goal) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            // if the goal is not found, then return 404, as the user has attempted to delete a non-existant goal
            if (!goal)
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});

            return res.status(200).json(sanitizeGoal(goal));
        });


    });
};
