# FHiR Visualization Apache Drill Connector Documentation

The Apache Drill connector is used to provide intermediate queries from the frontend to the database without reducing speed.

## Example Queries
```
SELECT
    *
FROM
    mongo.admin.observations
INNER JOIN 
    mongo.admin.companies
ON 
    companies._id = observations.performer
LIMIT 20;
```