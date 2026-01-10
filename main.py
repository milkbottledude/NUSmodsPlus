from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/jsons/<path:filename>')
def serve_json(filename):
    return send_from_directory('jsons', filename)

@app.route('/')
def base():
    return render_template('base.html')

@app.route('/pillar_mods')
def pillar():
    return render_template('pillar_mods.html')

@app.route('/pe_mods')
def pe():
    return render_template('pe_mods.html')

@app.route('/ue_mods')
def ue():
    return render_template('ue_mods.html')

@app.route('/idcd_mods')
def idcd():
    return render_template('idcd_mods.html')

@app.route('/timetable')
def timetable():
    return render_template('timetable.html')

# @app.route('/')
# def home():
#     return render_template('base.html')