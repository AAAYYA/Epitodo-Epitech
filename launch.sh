#!/bin/bash

if [[ $EUID -ne 0 ]]; then
    echo "Please run this script with sudo."
    exit 1
fi

echo "Make a wish!"
read  wish

if [ "$wish" == "show me the magic" ]; then
    sudo mysql -u root -p -e "SHOW DATABASES"
    exit 1
elif [ "$wish" == "launch database" ]; then
    cat src/epytodo.sql | sudo mysql -u root -p
    exit 1
elif [ "$wish" == "no" ]; then
    echo "bon bah baise ta mere alors"
    exit 1;
elif [ "$wish" == "erase database" ]; then
    sudo mysql -u root -p -e "DROP DATABASE epytodo"
    exit 1
elif [ "$wish" == "damian" ]; then
    cat damian.txt
    exit 1
elif [ "$wish" == "benjamin" ]; then
    cat benjamin.txt
    exit 1
else
    echo "Lis la doc enculé."
    exit 1
fi
