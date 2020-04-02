from flask import Flask, render_template, request
import json

import FileReader

with open('./AMZN.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
testJson = data
stock_ptice=[]
stock_date=[]
for i in testJson:
    stock_ptice.append(i['Close'])
    stock_date.append(i['Time'])

app = Flask(__name__)

text="123"


@app.route('/comp', methods=['GET'])
def company():
    print("aaaaa")
    ops = request.args.get('ops')
    if ops == '1':
        string= "comp1"
    if ops == '2':
        string= "comp2"
    if ops == '3':
        string= "comp3"
    if ops == '4':
        string= "comp4"
    if ops == '5':
        string= "comp5"
    if ops == '6':
        string= "comp6"
    if ops == '7':
        string= "comp7"
    if ops == '8':
        string= "comp8"
    if ops == '9':
        string= "comp9"
    result={"res":string}
    return result

@app.route('/')


def index():
    return render_template("index.html")


# def testGet():
#   if request.method == "GET":
#      return "Hello"


if __name__ == '__main__':
    app.run()
