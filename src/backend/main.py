from flask import Flask,render_template,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager,create_access_token,jwt_required

app=Flask(__name__)
CORS(app)
JWTManager(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://azim001:pmsmdazim@azim001.mysql.pythonanywhere-services.com/azim001$user"
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"]="secret-key"

db= SQLAlchemy(app)


class Game(db.Model):
    __tablename__="Game"
    player1=db.Column(db.String)
    player2=db.Column(db.String)
    winner=db.Column(db.String)
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)


@app.route("/storehistory",methods=['POST'])
def storehistory():
    if request.method=='POST':
        insert= Game(
            player1= request.form["player1"],
            player2= request.form["player2"],
            winner= request.form["winner"],
            )
        db.session.add(insert)
        db.session.commit()

    return jsonify({"status":"success"})


@app.route("/history")
def history():
    list=Game.query.all()
    return jsonify([{
        "player1": i.player1,
           "player2": i.player2,
           "winner" :i.winner

        }for i in list])