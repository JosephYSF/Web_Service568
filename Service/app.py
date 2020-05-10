from flask import Flask, render_template, request
import json
import pandas_datareader.data as web
import datetime
import re
import requests
from apscheduler.schedulers.blocking import BlockingScheduler
import pymongo
from Service import baysianPredict
from Service import SVR
from Service import indicator
from Service import ANN
from Service import DB_query

url_base = 'https://www.cnbc.com/quotes/?symbol='
client = pymongo.MongoClient('localhost')
db = client['stock']
company_name = ["GOOG", "MSFT", "AAPL", "NVDA", "SBUX", "AMZN", "OVTZ", "IBM", "AMD", "INTC"]


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
    dir_short = "../Service/static/data/" + comp + "_realtime_data.json"
    with open(dir_short, "w+") as f:
        json.dump(realtime, f, indent=4, sort_keys=True, default=str)
        print(comp + " Realtime  File Written Successfully...")


def get_historical_data(comp):
    start_time = datetime.datetime.strptime("2019,1,1", "%Y,%m,%d")
    end = datetime.date.today()
    company1 = web.DataReader(comp, "yahoo", start_time, end)
    time = []
    for i in company1.index:
        time.append(datetime.datetime.strftime(i, "%Y-%m-%d"))
    company1['index'] = time
    company1['Time'] = time
    dict = company1.set_index('index').T.to_dict('dict')
    output = []
    collection2 = db[comp + '_historical_data']
    db.drop_collection(collection2)
    for day in dict:
        collection2.insert(dict[day])
    for i in collection2.find():
        i['_id'] = re.findall("'(.*)'", i.get('_id').__repr__())[0]
        output.append(i)
    with open('../Service/static/data/' + comp +
              '_historical_data.json', 'w', encoding="UTF-8") as jf:
        jf.write(json.dumps(output, indent=2))
        # print(comp + " Historical File Written Successfully...")


def fileReader(comp):
    get_historical_data(comp)
    with open('../Service/static/data/' + comp + '_historical_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    testJson = data
    stock_price_open = []
    stock_price_close = []
    stock_price_high = []
    stock_price_low = []
    stock_volume = []
    stock_date = []
    for i in testJson:
        stock_price_open.append(i['Open'])
        stock_price_close.append(i['Close'])
        stock_price_high.append(i['High'])
        stock_price_low.append(i['Low'])
        stock_date.append(i['Time'])
        stock_volume.append(i['Volume'])
    ema12, ema26, diff, dea, bar = indicator.get_macd(stock_price_close)
    vr = indicator.get_vr(stock_volume, stock_price_open, stock_price_close)
    # print('EMA12 of ' + comp + ' is', ema12)
    # print('EMA26 of ' + comp + ' is', ema26)
    return stock_price_close, stock_price_high, stock_price_low, stock_volume, stock_date, ema12, ema26, diff, dea


def realTimeReader(comp):
    get_realtime_data(comp)
    volume = []
    price = []
    time = []
    with open('../Service/static/data/' + comp + '_realtime_data.json', 'r', encoding='utf-8') as f:
        data = json.loads(f.read())
        # print(type(data['Time']))
        time.append(data['Time'])
        # print(type(data['Price'][0]))
        price.append(data['Price'][0])
        volume.append(data['Volumn'])

    return volume, price, time


def predictor(comp, predict_len):
    stock_price, stock_1, stock_2, stock_3, stock_4, ema12, ema26, diff, dea = fileReader(comp)
    y, y_std = baysianPredict.run(stock_price, predict_len)
    y = y.tolist()
    SVR_result = SVR.run(comp, predict_len)
    SVR_result = SVR_result.tolist()
    # advice = ANN.ann_predict(comp)
    result = []
    for i in range(predict_len):
        result.append(y[i] * 0.3 + SVR_result[i] * 0.7)
    return result[-predict_len:]


# Using example, "AMZN" refers to companyname, 3 refers to prediction length
# y = predictor("AMZN", 3)
# print(y)
# SVR_result = SVR.run("AMZN",3)
# print(SVR_result)
# advice = ANN.ann_predict('GOOG')
advices = dict()
for comp in company_name:
    advice = ANN.ann_predict(comp)
    advices[comp] = advice
# print(advices)

app = Flask(__name__)


@app.route('/comp', methods=['GET'])
def company():
    ops = request.args.get('ops')
    stock_price_close, stock_price_high, stock_price_low, stock_volume, stock_date, ema12, ema26, diff, dea = fileReader(ops)
    volumn, price, time = realTimeReader(ops)
    # closePrice is the real time data
    closePrice = float(price[len(volumn) - 1])

    highPrice = float(stock_price_high[len(stock_price_high) - 1])

    lowPrice = float(stock_price_low[len(stock_price_low) - 1])

    # volume is the real time volume
    volume = volumn[len(volumn) - 1]

    # predict part
    pred = predictor(ops, 3)
    highest=DB_query.find_highest_in10(ops)
    avg=DB_query.find_average_oneyear(ops)
    lowest=DB_query.find_lowest_oneyear(ops)
    suggestion = advices
    result = {"res": ops, "close": closePrice, "High": highPrice, "Low": lowPrice, "Volume": volume,
              "allDate": stock_date, "allClose": stock_price_close, "pred": pred, "ema12": ema12, "ema26": ema26,
              "diff": diff, "dea": dea, "highest": highest, "avg": avg, "lowest": lowest, "advice": suggestion[ops]}
    return result


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run()
