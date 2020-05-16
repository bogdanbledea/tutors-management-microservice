#!flask/bin/python
from flask import Flask, jsonify, render_template, request
from flask_mysqldb import MySQL
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASS')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)

access_token = os.getenv('API_KEY')
wrong_token_message = 'Wrong access token!'

@app.route('/')
def index():
    return render_template('index.html')

# Get all tutors
@app.route('/tutors', methods=['GET'])
def get_tutors():
    user_token = request.args.get('access_token')
    # check if the user has right to get tutors, by the token he provide
    if access_token == user_token:   
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM tutors;")
        data = cur.fetchall()
        cur.close()
        return jsonify(data)
    if access_token != user_token:
        return wrong_token_message

# Get only requested tutor
@app.route('/tutor', methods=['GET'])
def get_tutor():
    user_token = request.args.get('access_token')
    if access_token == user_token: 
        username = request.args.get('name')
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM tutors WHERE firstName=%s", (username,))
        data = cur.fetchall()
        cur.close()
        return jsonify(data)

# Insert one tutor in database
@app.route('/add-tutor', methods=['POST'])
def add_tutor():
    if request.method == "POST":
        details = request.form
        firstName = details['firstName']
        lastName = details['lastName']
        email = details['email']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO tutors(firstName, lastName, email) VALUES (%s, %s, %s)", (firstName, lastName, email))
        mysql.connection.commit()
        cur.close()
        return 'success'

# Update a tutor
@app.route('/update-tutor', methods=['POST'])
def update_tutor():
    if request.method == "POST":
        details = request.form
        user_token = details['access_token']
        if access_token == user_token:
            tutor_id = details['id']
            firstName = details['firstName']
            lastName = details['lastName']
            email = details['email']
            cur = mysql.connection.cursor()
            cur.execute("UPDATE tutors SET firstName=%s, lastName=%s, email=%s WHERE id=%s", (firstName, lastName, email, tutor_id))
            mysql.connection.commit()
            cur.close()
            return 'User updated successfully!'

# Delete a tutor from database
@app.route('/delete-tutor', methods=['POST'])
def delete_tutor():
    if request.method == "POST":
        details = request.form
        user_token = details['access_token']
        if access_token == user_token: 
            tutor_id = details['id']
            cur = mysql.connection.cursor()
            cur.execute("DELETE FROM tutors WHERE id=%s", (tutor_id,))
            mysql.connection.commit()
            cur.close()
            return 'User deleted successfully!'

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)