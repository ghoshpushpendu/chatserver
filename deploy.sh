echo "Stoping Server ..."
pm2 stop 0
echo "Server Stopped."
#Clone the repo
echo "Cloning Git ...."
sudo git clone https://github.com/ghoshpushpendu/chatserver.git
echo "Git Clone Completed."
echo "Installing NPM"
npm install
echo "Packages Installed"
node index.js
echo "Starting Local Server"
echo "Putting Server to Splled"
sleep 4s
pm2 start 0

