# cv

# On DEV machine

rm dist
npm run build
docker build -t olimungo/cv:latest --push docker
docker build -t olimungo/cv:latest docker

# On host

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

docker run -d --rm --name=cv -p 80:80 olimungo/cv:latest

docker run --rm --name=cv -p 80:80 --mount source=/etc/ssl/certs/nginx-selfsigned.crt,target=/etc/ssl/certs/nginx-selfsigned.crt olimungo/cv:latest
