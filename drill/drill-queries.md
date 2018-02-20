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

### Query by code
```
SELECT 
    * 
FROM 
    (SELECT *,CAST(`extracted`.`code`.`coding`.`snowmedCT` AS VARCHAR) AS snowmedCode FROM mongo.admin.conditions AS extracted) AS withSnow  
WHERE 
    ILIKE(`withSnow`.`snowmedCode`, '29463-7');
```

### Annoymized Average Value per User in Company
```
SELECT 
    SUM(CAST(`value` AS DOUBLE))/COUNT(*), `observations`.`subject`
FROM 
    mongo.admin.`observations` AS observations 
WHERE 
    observations.performer = (SELECT company FROM mongo.admin.`corporateusers` WHERE email = 'kiran@mail.com' LIMIT 1)
AND
`observations`.`code`.`coding`.`snowmedCT` = '29463-7'
GROUP BY `observations`.`subject`
LIMIT 20;
```

### Intermediate mapping of avg-values to emails
```
SELECT `dataB`.`sumB`, `users`.`email`
FROM (SELECT 
    SUM(CAST(`value` AS DOUBLE))/COUNT(*) AS sumB, `observations`.`subject` AS subjectB
FROM 
    mongo.admin.`observations` AS observations 
WHERE 
    observations.performer = (SELECT company FROM mongo.admin.`corporateusers` WHERE email = 'kiran@mail.com' LIMIT 1)
AND
ILIKE(`observations`.`code`.`coding`.`snowmedCT`, '63863-5')
GROUP BY `observations`.`subject`) AS dataB
INNER JOIN
(
SELECT * FROM mongo.admin.`individualusers`
) AS users
ON dataB.subjectB = users._id
```

### x-y data of two data types
```
SELECT `resultA`.`data`, `resultB`.`data` FROM
(SELECT `dataB`.`sumB` AS data, `users`.`email` AS email
FROM (SELECT 
    AVG(CAST(`value` AS DOUBLE)) AS sumB, `observations`.`subject` AS subjectB
FROM 
    mongo.admin.`observations` AS observations 
WHERE 
    observations.performer = (SELECT company FROM mongo.admin.`corporateusers` WHERE email = 'kiran@mail.com' LIMIT 1)
AND
ILIKE(`observations`.`code`.`coding`.`snowmedCT`, '63863-5')
GROUP BY `observations`.`subject`) AS dataB
INNER JOIN
(
SELECT * FROM mongo.admin.`individualusers`
) AS users
ON dataB.subjectB = users._id) AS resultA
INNER JOIN
(SELECT `dataB`.`sumB` AS data, `users`.`email` AS email
FROM (SELECT 
    AVG(CAST(`value` AS DOUBLE)) AS sumB, `observations`.`subject` AS subjectB
FROM 
    mongo.admin.`observations` AS observations 
WHERE 
    observations.performer = (SELECT company FROM mongo.admin.`corporateusers` WHERE email = 'kiran@mail.com' LIMIT 1)
AND
ILIKE(`observations`.`code`.`coding`.`snowmedCT`, '29463-7')
GROUP BY `observations`.`subject`) AS dataB
INNER JOIN
(
SELECT * FROM mongo.admin.`individualusers`
) AS users
ON dataB.subjectB = users._id) AS resultB
ON resultA.email= resultB.email
```