import json


def readFile(filename):
    close_price = []
    with open(filename, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            for i in range(0,len(data)):

                close =  data[i]['Adj Close']
                close_price.append(close)
                #print(i,close)
            #print(close_price)
            return close_price
        except:
            f.close()



