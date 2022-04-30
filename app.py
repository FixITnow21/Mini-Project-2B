from flask import Flask, render_template, request
import pickle
import numpy as np
from weather import weather_fetch,aqi_fetch

app = Flask(__name__)

model = open("random-forest-model.pkl","rb")
model = pickle.load(model)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/', methods = ['POST'])
def main():
    if request.method == 'POST':
    	city =request.form['city']
    	if weather_fetch(city) != None:
            temp_max,temp_min,avg_temp,pressure,humidity,visibility,wind,lat,lon = weather_fetch(city)

            lat = str(lat)
            lon = str(lon)

            aqi = aqi_fetch(lat,lon)

            data = [[temp_max,temp_min,avg_temp,pressure,humidity,visibility,wind]]

            predict = model.predict(data)

            return render_template("index.html", lr_pm = np.round(predict,2)[0], city=city,aqi=aqi )
    	else:
    		title = 'Oops!! Something Went Wrong.'
    		return render_template('index.html',title = title)
            

if __name__ == "__main__":
    app.run(debug = True)
