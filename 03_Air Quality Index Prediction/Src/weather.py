import requests

def weather_fetch(city_name):
    """
    Fetch and returns the temperature and humidity of a city
    :params: city_name
    :return: temperature, humidity
    """
    api_key = '55bc774884f0fdbc579245b6128ddae0'
    base_url = "http://api.openweathermap.org/data/2.5/weather?"

    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]
        z = x['visibility']
        w = x['wind']
        c = x['coord']

        temp_max = round((y["temp_max"] - 273.15), 2)
        temp_min = round((y["temp_min"] - 273.15), 2)
        avg_temp = (temp_max+temp_min)/2

        pressure = y['pressure']
        humidity = y['humidity']

        visibility= z/1000
        wind = w['speed']
        lat = c['lat']
        lon = c['lon']

        return temp_max,temp_min,avg_temp,pressure,humidity,visibility,wind,lat,lon
    else:
        return None



def aqi_fetch(lat,lon):
    """
    Fetch and returns the temperature and humidity of a city
    :params: city_name
    :return: temperature, humidity
    """
    api_key = '55bc774884f0fdbc579245b6128ddae0'
    base_url = "http://api.openweathermap.org/data/2.5/air_pollution/forecast?"

    complete_url = base_url + "appid=" + api_key + "&lat="+ lat + "&lon=" + lon
    response = requests.get(complete_url)
    a = response.json()

    b = a['list'][0]

    aqi = b['main']['aqi']


    return aqi
