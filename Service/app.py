from flask import Flask, render_template, request
import json


def fileReader(comp):
    with open('./data/' + comp + '.json', 'r', encoding='utf-8') as f:
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
    volume = []
    price = []
    time = []
    with open('./data/' + comp + '_realtime_data.json', 'r', encoding='utf-8') as f:
        data = json.loads(f.read())
        print(type(data['Time']))
        time.append(data['Time'])
        print(type(data['Price'][0]))
        price.append(data['Price'][0])
        volume.append(data['Volumn'])

    return volume, price, time


app = Flask(__name__)



@app.route('/comp', methods=['GET'])
def company():
    # print("aaaaa")
    ops = request.args.get('ops')
    stock_price_close, stock_price_high, stock_price_low, stock_volume, stock_date = fileReader(ops)
    volumn, price, time = realTimeReader(ops)
    # closePrice = stock_price_close[len(stock_price_close) - 1]
    closePrice = price[len(volumn) - 1]

    highPrice = stock_price_high[len(stock_price_high) - 1]

    lowPrice = stock_price_low[len(stock_price_low) - 1]

    # volume = stock_volume[len(stock_volume) - 1]
    volume = volumn[len(volumn) - 1]

    result = {"res": ops, "close": closePrice, "High": highPrice, "Low": lowPrice, "Volume": volume,
              "allDate": stock_date, "allClose": stock_price_close}
    return result


@app.route('/')
def index():
    return render_template("index.html")


# def testGet():
#   if request.method == "GET":
#      return "Hello"


if __name__ == '__main__':
    app.run()
