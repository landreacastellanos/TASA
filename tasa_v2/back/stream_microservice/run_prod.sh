rm -rf env_development
rm -rf __pycache__

virtualenv -p /usr/bin/python3 env_development
source env_development/bin/activate
pip3 install -r ./requirements/base.txt

export FLASK_APP=manage.py
flask run --host=0.0.0.0 --port 5025