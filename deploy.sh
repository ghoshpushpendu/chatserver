pm2 stop 0
#Clone the repo
sudo git clone https://github.com/ghoshpushpendu/chatserver.git
npm install
node index.js
sleep 4s
pm2 start 0

