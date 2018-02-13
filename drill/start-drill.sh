sed -r -i "s/(zk.connect):(.*)/\1: \"$ZK\"/g" /opt/drill/conf/drill-override.conf
sed -r -i "s/(cluster-id):(.*)/\1: \"$CLUSTER_ID\"/g" /opt/drill/conf/drill-override.conf

/opt/drill/bin/drillbit.sh --config /opt/drill/conf/ start