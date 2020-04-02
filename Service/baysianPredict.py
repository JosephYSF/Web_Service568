import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
import datetime


# import pandas_datareader.data as web

# def history_data(stock,start,end):
#     start_time = datetime.datetime.strptime(start, "%Y,%m,%d")
#     end = datetime.datetime.strptime(end,"%Y,%m,%d")
#     company = web.DataReader(stock, "yahoo", start_time, end)
#     return company

def SSE_mesure(lenth):
    sum = 0
    for i in range(lenth):
        sum += (y[i] - y_train[i]) ** 2
    return sum


def R_square(lenth):
    sum_1 = SSE_mesure()
    sum_2 = 0
    for i in range(lenth):
        sum_2 += (y_train[i] - y_train.mean()) ** 2
    R_square_value = 1 - (sum_1 / sum_2)
    return R_square_value


def Adj_R_square(lenth):
    Adj_R_square_value = 1 - (((1 - R_square()) * (lenth - 1)) / (lenth - M - 1))
    return Adj_R_square_value


class Bayesian_curvefitiing():

    def __init__(self, alpha=1., beta=1.):
        self.alpha = alpha
        self.beta = beta
        self.mean_prev = None
        self.S = None

    def fit(self, X, t):
        S_inv = self.alpha * np.eye(np.size(X, 1)) + self.beta * np.matmul(X.T, X)
        mean_prev = np.linalg.solve(
            S_inv,
            self.beta * np.matmul(X.T, t)
        )
        self.mean_prev = mean_prev
        self.S = np.linalg.inv(S_inv)

    def predict(self, X):
        y = np.matmul(X, self.mean_prev)
        y_var = 1 / self.beta + np.sum(np.matmul(X, self.S) * X, axis=1)
        y_std = np.sqrt(y_var)
        return y, y_std


def Auto_adjusted_M(x_train, y_train, x_test, lenth):
    scores = []
    for i in range(20):
        poly_test = PolynomialFeatures(i)
        X_train = poly_test.fit_transform(x_train)
        X_test = poly_test.fit_transform(x_test)
        model_test = Bayesian_curvefitiing(alpha=5e-3, beta=11.1)
        model_test.fit(X_train, y_train)
        y, y_std = model_test.predict(X_test)
        sum_1 = 0
        sum_2 = 0
        for j in range(lenth):
            sum_1 += (y[j] - y_train[j]) ** 2
            sum_2 += (y_train[j] - y_train.mean()) ** 2
        R_square_value = 1 - (sum_1 / sum_2)
        score = 1 - (((1 - R_square_value) * (lenth - 1)) / (lenth - i - 1))
        scores.append(score)
    return scores


def early_stop(scores):
    for i in range(20):
        if scores[i + 1] - scores[i] <= 0.01 and scores[i + 2] - scores[i - 1] <= 0.1:
            return i


# stockprice = history_data('AAPL', "2016,1,1", "2017,1,1")['Close'].to_list()
# x_train = np.linspace(1, 210, 210)
# x_train = x_train.reshape(-1, 1)
# y_train = stockprice[:210]
# y_train = np.array(y_train)
# y_train = y_train.reshape(210)
# x_test = np.linspace(1, 217, 217)
# x_test = x_test.reshape(-1, 1)
# y_test = stockprice[210:217]
# y_test = np.array(y_test)
#
# Ms=Auto_adjusted_M(x_train,y_train,x_test) #Polynomial degree
# print(Ms)
# M=early_stop(Ms)
# print(M)
# poly = PolynomialFeatures(M)
# X_train = poly.fit_transform(x_train)
# X_test = poly.fit_transform(x_test)
#
# model = Bayesian_curvefitiing(alpha=5e-3, beta=11.1)
# model.fit(X_train, y_train)
# y, y_std = model.predict(X_test)
#
# print(SSE_mesure())
# print(R_square())
# print(Adj_R_square())
#
# fig = plt.figure()
# plt.scatter(x_train, y_train, facecolor="none", edgecolor="b", s=20, label="training data")
# plt.plot(x_train, y_train, c="b", label="trained stock price")
# plt.plot(x_test, y, c="r", label="predicted stock price")
# real_price=np.linspace(211,217,7).reshape(-1,1)
# plt.plot(real_price, y_test, c="g", label="real stock price")
# plt.scatter(real_price, y_test, c="g", s=20, label="real stock price")
# plt.fill_between(x_test.flatten(), y - y_std, y + y_std, color="pink", label="std.", alpha=0.5)
# plt.title("M="+str(M))
# plt.legend(loc=2)
# plt.show()

def run(stock_price, predict_lenth):
    lenth = len(stock_price)
    pre_len = predict_lenth
    x_train_set = np.linspace(1, lenth, lenth)
    x_train_set = x_train_set.reshape(-1, 1)
    y_train_set = stock_price
    y_train_set = np.array(y_train_set)
    y_train_set = y_train_set.reshape(lenth)
    x_test_set = np.linspace(1, lenth, lenth + pre_len)
    x_test_set = x_test_set.reshape(-1, 1)
    Ms_set = Auto_adjusted_M(x_train_set, y_train_set, x_test_set, lenth)
    M_set = early_stop(Ms_set)
    poly = PolynomialFeatures(M_set)
    X_train = poly.fit_transform(x_train_set)
    X_test = poly.fit_transform(x_test_set)

    model = Bayesian_curvefitiing(alpha=5e-3, beta=11.1)
    model.fit(X_train, y_train_set)
    y, y_std = model.predict(X_test)
    return y, y_std
