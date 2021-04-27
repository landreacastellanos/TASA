# Mount disk
df -h
lsblk
mkfs.ext4 -m 0 -F -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/sbd
cd /
mkdir /data
mount -o discard,defaults /dev/sdb /data
cp /etc/fstab /etc/fstab.backup
blkid /dev/sdb
## copy ID to paste in nano
nano /etc/fstab
cat /etc/fstab

# Docker install
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

sudo curl -L "https://github.com/docker/compose/releases/
download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

apt install git -y
git clone https://github.com/landreacastellanos/TASA.git

