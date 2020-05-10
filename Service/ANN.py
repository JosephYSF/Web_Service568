import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from tensorflow import keras
from sklearn.metrics import r2_score
from keras.models import Sequential
from keras.layers import Dense
from keras.callbacks import EarlyStopping
import pandas as pd
import pandas_datareader.data as web
import datetime
import json
import pymongo
import re

client = pymongo.MongoClient('localhost')
db = client['stock_10_years']
# company_name = ["GOOG", "MSFT", "AAPL", "NVDA", "SBUX", "AMZN", "OVTZ", "IBM", "AMD", "INTC"]
company_name = ["GOOG"]


def get_historical_data(comp):
    start_time = datetime.datetime.strptime("2013,1,1", "%Y,%m,%d")
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
    with open('../Service/static/data_10_years/' + comp +
              '_historical_data.json', 'w', encoding="UTF-8") as jf:
        jf.write(json.dumps(output, indent=2))


def fileReader(comp):
    get_historical_data(comp)
    with open('../Service/static/data_10_years/' + comp + '_historical_data.json', 'r', encoding='utf-8') as f:
        data = json.loads(f.read())
    # key = ['_id', 'High', 'Low', 'Open', 'Close', 'Volume', 'Adj Close', 'Time']
    # a = dict([(k, 0) for k in key])
    # for i in range(10):
    #     data.append(a)
    df = pd.DataFrame(data)
    # df.append(data)
    # df = pd.read_json('../data_10_years/' + comp + '_historical_data.json')
    # df.drop(['_id', 'Open', 'High', 'Low', 'Close', 'Volume'], axis=1, inplace=True)
    df.drop(['_id', 'Open', 'High', 'Low', 'Close', 'Volume'], axis=1, inplace=True)
    # add
    # df.append()
    df['Time'] = pd.to_datetime(df['Time'])
    df = df.set_index(['Time'], drop=True)
    # print(df)
    df.head(10)
    return df


def ann_predict(comp):
    df = fileReader(comp)
    # split_date = pd.Timestamp('2020-01-01')
    # split_date = 600
    df = df['Adj Close']
    # print(df)
    train = df
    # train = df.loc[:split_date]
    # test = df.loc[split_date:]
    # plt.figure(figsize=(10, 6))
    # ax = train.plot()
    # test.plot(ax=ax)
    # plt.legend(['train', 'test'])
    # train = df
    # print(test)
    # print(type(test))

    scaler = MinMaxScaler(feature_range=(-1, 1))
    train_sc = scaler.fit_transform(train.values.reshape(-1, 1))
    # test_sc = scaler.transform(test.values.reshape(-1, 1))
    # print(test_sc)
    # print(type(test_sc))

    X_train = train_sc[:-10]
    y_train = train_sc[10:]
    X_test = train_sc[len(train_sc) - 10:]
    # y_test = test_sc[10:]
    # # print("X_test", X_test)

    nn_model = Sequential()
    nn_model.add(Dense(12, input_dim=1, activation='relu'))
    nn_model.add(Dense(1))
    nn_model.summary()

    # adam = keras.optimizers.Adagrad(lr=0.01, epsilon=None, decay=0.0)
    nn_model.compile(loss='mean_squared_error', optimizer='adam')
    early_stop = EarlyStopping(monitor='loss', patience=2, verbose=1)
    history = nn_model.fit(X_train, y_train, epochs=100, batch_size=1, verbose=1, callbacks=[early_stop],
                           shuffle=False)
    # history = nn_model.fit(X_train, y_train, epochs=100, batch_size=1, verbose=1, shuffle=False)
    y_pred_test_nn = nn_model.predict(X_test)
    y_pred_train_nn = nn_model.predict(X_train)

    # print("The R2 score on the Train set is:\t{:0.3f}".format(r2_score(y_train, y_pred_train_nn)))
    # print("The R2 score on the Test set is:\t{:0.3f}".format(r2_score(y_test, y_pred_test_nn)))
    # plt.figure(figsize=(10, 6))
    # plt.plot(y_test, label='test_True')
    # plt.plot(y_pred_test_nn, label='test_NN')
    # plt.plot(y_train, label='True')
    # plt.plot(y_pred_train_nn, label='NN')
    # plt.title("ANN's Prediction")
    # plt.xlabel('Observation')
    # plt.ylabel('Adj Close Scaled')
    # plt.legend()
    # plt.show()
    price_pred = y_pred_test_nn[len(y_pred_test_nn) - 1]
    price_now = train_sc[len(train_sc) - 1]
    # print("The stock price for 10 days later will be", price_pred, ".")
    if abs((price_pred - price_now) / price_now) < 0.05:
        advice = "The stock price in future ten days will be stable."
    elif price_pred > price_now:
        advice = "The stock price in future ten days will rise! Please consider purchasing more shares!"
    else:
        advice = "The stock price in future ten days will drop! Please consider selling your shares!"
    return advice


# for comp in company_name:
#     df = fileReader(comp)
#     ann_predict(df)
