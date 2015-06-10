rm -rf ./output
fisp release -cupd ./output -r ldsn-pc
fisp release -coupd ./output -r ldsn-wap
fisp release -coupd ./output -r common
tar zcvf output.tar.gz output
scp output.tar.gz root@server.ldustu.com:/root/
echo '完成'
