import pymongo
client = pymongo.MongoClient('localhost')
db = client['stock']

def find_highest_in10(comp):
    tendays=[]
    collection=db[comp+'_historical_data']
    results=collection.find()
    for result in results:
        tendays.append(result['Close'])
    tendays=tendays[-10:]
    return max(tendays)

def find_average_oneyear(comp):
    sum=0
    lenth=0
    collection=db[comp+'_historical_data']
    results=collection.find()
    for result in results:
        sum+=result['Close']
        lenth+=1
    avg=sum/lenth
    return avg

def find_lowest_oneyear(comp):
    oneyear=[]
    collection=db[comp+'_historical_data']
    results=collection.find()
    for result in results:
        oneyear.append(result['Close'])
    return min(oneyear)