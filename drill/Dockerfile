FROM <somebase>

RUN mkdir /opt/drill
RUN wget -q -O - http://apache.mirror.anlx.net/drill/drill-1.12.0/apache-drill-1.12.0.tar.gz | tar xzf - --strip=1 -C /opt/drill

COPY start-drill.sh /opt/drill/bin/start-drill.sh

EXPOSE 8047 31010 3101 31012 46655
CMD /opt/drill/bin/start-drill.sh && tail -f /opt/drill/log/drillbit.out