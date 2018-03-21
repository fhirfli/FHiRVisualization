module.exports = (env, router) => {
    const Company = require('../../db/models/company');
    const CompanyAssociations = require('../../db/models/companyAssociations');
    const IndividualUser = require('../../db/models/user').individual;
    const sanitizeError = require('../../sanitizeError');
    const ObjectId = require('mongoose').Types.ObjectId;

    // Reusable callback function to return all associated individual users for a corporate user's company
    function returnAssociatedCustomers(req, res) {
        // Find the company associations document representing associations for the user's company
        CompanyAssociations.find({
            'company': ObjectId(req.user.company)
        }, (err, associations) => {
            if (err) {
                return res.status(400).json(sanitizeError(env, err));
            }

            // Find all users with id's in the provided list
            IndividualUser.find({
                '_id': {
                    $in: associations.map((association) => {
                        // Due to the way Mongoose works, each of the strings have to be converted to ObjectId Objects
                        return ObjectId(association.user)
                    })
                }
            }, (err, users) => {
                if (err) {
                    return res.status(400).json(sanitizeError(env, err));
                }

                // Sanitize the retrieved data, returning only a list of each individual user's email
                // (rather than the complete user object which would contain personally identifiable data)
                return res.status(200).json(users.map((user) => {
                    return {
                        email: user.email
                    };
                }));
            });

        });
    }

    // Returns all associated individual users for a corporate user's company
    router.get('/associations', returnAssociatedCustomers);

    // DELETE Requests to associations removes associated users from a corporate user's corporation
    router.delete('/associations', (req, res) => {
        const {email} = req.body;

        // Check request parameters
        if (!email)
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});

        // Find the individual user associated with the email
        IndividualUser.findOne({email: email}, (err, user) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            // Return 404 if the user is not found, as the corporate user has tried to delete a non existant user
            if (!user)
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});

            // Find the company associations document representing associations for the user's company
            CompanyAssociations.findOne({user: user._id}, (err, association) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                if (!association) {
                    // If no association exists for the user's company, create one.
                    association = new CompanyAssociations({
                        user: user._id,
                        company: []
                    });
                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                        // finally return the updated list of associated customers
                        return returnAssociatedCustomers(req, res);
                    });
                } else {
                    // if the association document exists, check that the individual user selected
                    // for removal is actually associated with the company
                    if (!association.company.some(doc => doc.equals(req.user.company))) {
                        return res.status(400).json({error: 'COMPANY_NOT_ASSOCIATED'});
                    }

                    // Otherwise, remove the individual user from the list of associated users
                    association.company.splice(association.company.indexOf(req.user.company));

                    association.save((err, saved) => {
                        if (err)
                            return res.status(400).json(sanitizeError(env, err));

                        // Sanitize the retrieved data, returning only the individual user's email
                        // (rather than the complete user object which would contain personally identifiable data)
                        return res.status(200).json({email: user.email});
                    });
                }
            });
        });

    });
};
