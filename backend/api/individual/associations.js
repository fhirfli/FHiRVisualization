// References:
// Mongoose Check if objectId exists in array
// Reference: https://stackoverflow.com/questions/19737408/mongoose-check-if-objectid-exists-in-an-array
// Line: 93, 178

module.exports = (env, router) => {
    const CompanyAssociations = require('../../db/models/companyAssociations');
    const Company = require('../../db/models/company');
    const sanitizeError = require('../../sanitizeError');
    const ObjectId = require('mongoose').Types.ObjectId;


    // Returns all associated companies for a user
    router.get('/associations', (req, res) => {

        // retrieve all users from the MongoDB
        CompanyAssociations.findOne({
            user: req.user._id
        }).populate('company').exec((err, association) => {
            if (err) {
                return res.status(400).json(sanitizeError(env, err));
            }

            // Check user has recorded associations
            if (!association) {
                // if not create a document in the database to represent the user's associated corporations
                association = new CompanyAssociations({
                    user: req.user._id,
                    company: []
                });
                association.save((err, saved) => {
                    if (err) {
                        return res.status(400).json(sanitizeError(env, err));
                    }
                    return res.status(200).json(saved.company);
                });
            } else {
                // sanitize the list of companies to remove sensitive, application critical data
                let companies = association.company.map((company) => {
                    return {
                        domain: company.domain,
                        name: company.name
                    };
                });

                return res.status(200).json(companies);
            }
        });
    });

    // POST request to associations adds an association to a new corporation
    router.post('/associations', (req, res) => {
        const {domain} = req.body;


        // Check parameters
        if (!domain) {
            return res.status(400).json({error: "INCOMPLETE_PARAMETERS"});
        }


        // find company document associated with the domain provided by the user
        Company.findOne({domain}, (err, company) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            // if no company by the domain exists, return 404
            if (!company)
                return res.status(404).json({error: "RESOURCE_NOT_FOUND"});

            // now, we must check for whether the company is already associated
            // to do this, we retrieve the document representing the associated companies for a user
            CompanyAssociations.findOne({user: req.user._id}, (err, association) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                // if no document exists for this user, we create one, and insert the requested company
                if (!association) {
                    association = new CompanyAssociations({
                        user: req.user._id,
                        company: [company._id]
                    });

                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                        return res.status(200).json(saved.company);
                    });
                } else {
                    // if a document exists, we must find out whether the id of the requested endpoint is present
                    if (association.company.some((doc) => doc.equals(company._id))) {
                        return res.status(400).json({error: "COMPANY_ALREADY_ASSOCIATED"});
                    }

                    // if it doesn't exist, add the company
                    association.company.push(company._id);
                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                        // following the convention for the API, after each request, the updated version of the modified
                        // item is returned - in this case it would be the list of corporations

                        // Find all companies with id's in the list of associated companies
                        Company.find({
                            '_id': {
                                $in: association.company.map(id => ObjectId(id))
                            }
                        }, (err, companies) => {
                            if (err) {
                                return res.status(400).json(sanitizeError(env, err));
                            }

                            // sanitize the data, removing sensitive, application critical data
                            let result = companies.map((company) => {
                                return {
                                    domain: company.domain,
                                    name: company.name
                                };
                            });

                            // return the data
                            return res.status(200).json(result);
                        });
                    });
                }
            });
        });
    });

    // DELETE request removes the association
    router.delete('/associations', (req, res) => {
        const {domain} = req.body;

        // Check parameters for request
        if (!domain) {
            return res.status(400).json({error: "INCOMPLETE_PARAMETERS"});
        }

        // Find company associated with domain
        Company.findOne({domain}, (err, company) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            // if no company is recorded as being associated with the domain, return 404
            if (!company)
                return res.status(404).json({error: "RESOURCE_NOT_FOUND"});

            // Check that the association to delete already exists
            CompanyAssociations.findOne({user: req.user._id}, (err, association) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                // if no document to represent the individual user's associated corporation exists
                if (!association) {
                    // create a document to represent the individual user's associated corporations
                    association = new CompanyAssociations({
                        user: req.user._id,
                        company: []
                    });
                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                        // return 400, as the corporation isn't associated with the individual
                        return res.status(400).json({error: "COMPANY_NOT_ASSOCIATED"});
                    });
                } else {

                    // Check company is present in list of associated corporations
                    if (!association.company.some((doc) => doc.equals(company._id))) {
                        // return 400, as the corporation isn't associated with the individual
                        return res.status(400).json({error: "COMPANY_NOT_ASSOCIATED"});
                    }

                    // remove the company from the list of associated companies
                    association.company.splice(association.company.indexOf(company._id),1);

                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                           return res.status(200).json({domain: company.domain});
                    });
                }
            });
        });

    });
};
