rm -f .env
if [[ $2 = '' ]]; then
    cp ./env/.env ./.env
else
    cp ./env/.env-$2 ./.env
fi

react-scripts $1
