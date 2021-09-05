from flask import Flask, render_template, request, session


app = Flask(__name__, template_folder="static")
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
app.config["SESSION_COOKIE_SECURE"] = True


@app.get("/")
def home():
    return render_template("index.html")


@app.post("/handleClick")
def handleClick():
    msg = request.get_json()
    session["clicked"] = msg["clicked"] + 1
    return {"value": session["clicked"]}
