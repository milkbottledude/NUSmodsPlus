from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('base.html')

@app.route('/pillar_mods')
def home():
    return render_template('pillar_mods.html')

@app.route('/pe_mods')
def home():
    return render_template('pe_mods.html')

@app.route('/ue_mods')
def home():
    return render_template('ue_mods.html')

@app.route('idcd_mods/')
def home():
    return render_template('idcd_mods.html')

@app.route('timetable/')
def home():
    return render_template('timetable.html')

# @app.route('/')
# def home():
#     return render_template('base.html')