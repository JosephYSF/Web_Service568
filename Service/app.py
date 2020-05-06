from flask import Flask, render_template, request
import json
import pandas_datareader.data as web
import datetime
import re
import requests
from apscheduler.schedulers.blocking import BlockingScheduler
import pymongo
from Service import baysianPredict

url_base = 'https://www.cnbc.com/quotes/?symbol='
client = pymongo.MongoClient('localhost')
db = client['stock']


def get_realtime_data(comp):
        url = url_base + comp
        strhtml = requests.get(url)
        price = r'<meta itemprop="price" content="(.*?)" />'
        volume = r'"I":{"styles":{"A":""},"values":{"B":"(.*?)"}},"J":'
        timestamp = datetime.datetime.now()
        text_price = re.findall(price, strhtml.text, re.S | re.M)
        text_volume = re.findall(volume, strhtml.text, re.S | re.M)
        realtime = {"Time": timestamp,
                    "Price": text_price,
                    "Volumn": text_volume}
        collection1 = db[comp + '_realtime_data']
        db.drop_collection(collection1)
        collection1.insert(realtime)
        # to run the program, you need to change the direction here
        dir_short = "/Users/sf/Desktop/RU/ECE_568/Web Service/JosephYSF/Service/static/data/" + comp + "_realtime_data.json"
        with open(dir_short, "a") as f:
            json.dump(realtime, f, indent=4, sort_keys=True, default=str)
            print(comp + " Realtime  File Written Successfully...")

def fileReader(comp):
    with open('/Users/sf/Desktop/RU/ECE_568/Web Service/JosephYSF/data/' + comp + '.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    testJson = data
    stock_price_close = []
    stock_price_high = []
    stock_price_low = []
    stock_volume = []
    stock_date = []
    for i in testJson:
        stock_price_close.append(i['Close'])
        stock_price_high.append(i['High'])
        stock_price_low.append(i['Low'])
        stock_date.append(i['Time'])
        stock_volume.append(i['Volume'])
    return stock_price_close, stock_price_high, stock_price_low, stock_volume, stock_date


def realTimeReader(comp):
    # get_realtime_data(comp)
    volume = []
    price = []
    time = []
    with open('/Users/sf/Desktop/RU/ECE_568/Web Service/JosephYSF/data/' + comp + '_realtime_data.json', 'r', encoding='utf-8') as f:
        data = json.loads(f.read())
        # print(type(data['Time']))
        time.append(data['Time'])
        # print(type(data['Price'][0]))
        price.append(data['Price'][0])
        volume.append(data['Volumn'])

    return volume, price, time


def predictor(comp, predict_len):
    stock_price, stock_1, stock_2, stock_3, stock_4 = fileReader(comp)
    y, y_std = baysianPredict.run(stock_price, predict_len)
    y = y.tolist()
    return (y[-predict_len:])


# Using example, "AMZN" refers to companyname, 3 refers to prediction length
y = predictor("AMZN", 3)
print(y)

app = Flask(__name__)


@app.route('/comp', methods=['GET'])
def company():
    ops = request.args.get('ops')
    stock_price_close, stock_price_high, stock_price_low, stock_volume, stock_date = fileReader(ops)
    volumn, price, time = realTimeReader(ops)
    # closePrice is the real time data
    closePrice = float(price[len(volumn) - 1])

    highPrice = float(stock_price_high[len(stock_price_high) - 1])

    lowPrice = float(stock_price_low[len(stock_price_low) - 1])

    # volume is the real time volume
    volume = volumn[len(volumn) - 1]

    # predict part
    pred=predictor(ops,3)

    result = {"res": ops, "close": closePrice, "High": highPrice, "Low": lowPrice, "Volume": volume,
              "allDate": stock_date, "allClose": stock_price_close, "pred":pred}
    return result


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run()
