from flask import Flask, render_template, request
import json

import FileReader
def fileReader(comp):
    with open('./'+comp+'.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    testJson = data
    stock_price=[]
    stock_date=[]
    for i in testJson:
        stock_price.append(i['Close'])
        stock_date.append(i['Time'])
    return stock_price,stock_date

app = Flask(__name__)

text="123"

# company=["AMZN","GOOG"]

@app.route('/comp', methods=['GET'])
def company():
    # print("aaaaa")
    ops = request.args.get('ops')
    stock_price,stock_date=fileReader(ops)
    closePrice= stock_price[len(stock_price)-1]
    result={"res":ops,"close":closePrice}
    return result

@app.route('/')


def index():
    return render_template("index.html")


# def testGet():
#   if request.method == "GET":
#      return "Hello"


if __name__ == '__main__':
    app.run()
