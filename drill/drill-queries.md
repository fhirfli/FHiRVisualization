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

```$xslt
SELECT 
    SUM(CAST(`value` AS DOUBLE))
FROM 
    mongo.admin.`observations` AS observations 
WHERE 
    observations.performer = (SELECT company FROM mongo.admin.`corporateusers` WHERE email = 'kiran@mail.com' LIMIT 1) 
LIMIT 20;
```

### Average Value
```
SELECT 
    SUM(CAST(`value` AS DOUBLE))/COUNT(*), 
    `subject` 
FROM 
    mongo.admin.`observations` AS observations 
WHERE 
    observations.performer = (SELECT company FROM mongo.admin.`corporateusers` WHERE email = 'kiran@mail.com' LIMIT 1) 
GROUP BY 
    observations.subject 
LIMIT 20;
```