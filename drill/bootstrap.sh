#!/bin/bash



cd /opt/drill;
# bin/sqlline -u jdbc:drill:zk=local

bin/drill-embedded
# & ( sleep 500; echo "Sending request";  curl -i -H "Accept: application/json" -H "Content-type: application/json" --data /opt/drill/mongo.sys.json http://localhost:8047/storage/mongoPlugin.json) && fg
