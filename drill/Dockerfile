# FROM openjdk:9-jdk
FROM centos

# Make directory to store drill
RUN mkdir -p /opt/drill/storage/sys.storage_plugins

RUN yum install -y tar java-1.8.0-openjdk-devel
RUN yum install -y wget

# download and extract drill
RUN wget -q -O - http://apache.mirror.anlx.net/drill/drill-1.12.0/apache-drill-1.12.0.tar.gz | tar zxf - --strip-components=1 -C /opt/drill

# copy over mongodb config file
# COPY bootstrap-storage-plugins.json  /opt/drill/

# configure mongodb connection automatically
COPY mongo.sys.json /opt/drill/storage/sys.storage_plugins/mongo.sys.drill
COPY drill-override.conf /opt/drill/conf/drill-override.conf


# load over and setup script to start drill
COPY bootstrap.sh /etc/bootstrap.sh
RUN chown root:root /etc/bootstrap.sh
RUN chmod 700 /etc/bootstrap.sh
ENV BOOTSTRAP /etc/bootstrap.sh


ENV DRILL_HOME /opt/drill
ENV JAVA_HOME /usr/lib/jvm/java-1.8.0-openjdk

# when running the dockerfile, run the startup script and print the log
# Expose required ports for drill
EXPOSE 8047
CMD /etc/bootstrap.sh && tail -f /opt/drill/log/drillbit.out
