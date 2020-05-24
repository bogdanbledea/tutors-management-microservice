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
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

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
        cur.execute("SELECT * FROM Tutors;")
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
        user_token = details['access_token']
        if access_token == user_token:
            details = request.form
            name=details.get("name", False)
            idProfessionalDegree=details.get("idProfessionalDegree", False)
            dateOfBirth=details.get("dateOfBirth", False)
            idOffice=details.get("idOffice", False)
            email=details.get("email", False)
            phoneNumber=details.get("phoneNumber", False)
            idDepartament=details.get("idDepartament", False)
            hireDate=details.get("hireDate", False)
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO tutors(name, idProfessionalDegree, dateOfBirth, idOffice, email, phoneNumber, idDepartament, hireDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (name, idProfessionalDegree, dateOfBirth, idOffice, email, phoneNumber, idDepartament, hireDate))
            mysql.connection.commit()
            cur.close()
            return 'Tutor added successfully!', 200
        if access_token != user_token:
            return 'Wrong access key!', 401

# Update a tutor
@app.route('/update-tutor', methods=['POST'])
def update_tutor():
    if request.method == "POST":
        details = request.form
        user_token = details.get("access_token", False)
        if access_token == user_token:
            idTutor=details.get("idTutor", False)
            name=details.get("name", False)
            idProfessionalDegree=details.get("idProfessionalDegree", False)
            dateOfBirth=details.get("dateOfBirth", False)
            idOffice=details.get("idOffice", False)
            email=details.get("email", False)
            phoneNumber=details.get("phoneNumber", False)
            idDepartament=details.get("idDepartament", False)
            hireDate=details.get("hireDate", False)
            cur = mysql.connection.cursor()
            cur.execute("UPDATE tutors SET name=%s, idProfessionalDegree=%s, dateOfBirth=%s, idOffice=%s, email=%s, phoneNumber=%s, idDepartament=%s, hireDate=%s WHERE idTutor=%s", (name, idProfessionalDegree, dateOfBirth, idOffice, email, phoneNumber, idDepartament, hireDate, idTutor))
            mysql.connection.commit()
            cur.close()
            return 'Tutor updated successfully!'
        if access_token != user_token:
            return 'Wrong access key!', 401

# Delete a tutor from database
@app.route('/delete-tutor', methods=['POST'])
def delete_tutor():
    if request.method == "POST":
        details = request.form
        user_token = details.get("access_token", False)
        if access_token == user_token:
            tutor_id = details['id']
            cur = mysql.connection.cursor()
            cur.execute("DELETE FROM tutors WHERE idTutor=%s", (tutor_id,))
            mysql.connection.commit()
            cur.close()
            return 'User deleted successfully!'
        if access_token != user_token:
            return 'Wrong access key!', 401

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
