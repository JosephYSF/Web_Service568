from sklearn import svm
import json
import numpy as np


def fileReader(comp):
    with open('../Service/static/data/' + comp + '_historical_data.json', 'r', encoding='utf-8') as f:
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


def run(comp, predict_len):
    stock_price_close, stock_price_high, stock_price_low, stock_volume, stock_date = fileReader(comp)
    data_len = len(stock_price_close)
    x_train = np.linspace(1, data_len, data_len)
    x_train = x_train.reshape(-1, 1)
    y_train = stock_price_close
    x_test = np.linspace(data_len + 1, data_len+predict_len+1 , predict_len)
    x_test = x_test.reshape(-1, 1)
    #y_test = stock_price_close[len(x_train):]
    model = svm.SVR(kernel="poly", degree=8)
    model.fit(x_train, y_train)
    predict = model.predict(x_test)
    return predict
