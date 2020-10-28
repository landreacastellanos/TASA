rm -rf env_development
rm -rf __pycache__

virtualenv -p /usr/bin/python3 env_development
pip3 install -r ./requirements/base.txt

source env_development/bin/activate
export FLASK_APP=manage.py
flask run --host=0.0.0.0 --port 5024