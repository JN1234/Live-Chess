
import time
import requests
import json
from requests.structures import CaseInsensitiveDict

def post(label,price,final_rate,taken):
    global id
    url = "https://prokiosk.herokuapp.com/product"
    headers = CaseInsensitiveDict()
    headers["Content-Type"] = "application/json"
    data_dict = {"id":id_product,"name":label,"price":price,"unit":"units","taken":taken,"payable":final_rate}
    data = json.dumps(data_dict)
    resp = requests.post(url, headers=headers, data=data)
    print(resp.status_code)
    id_product = id_product + 1  
    time.sleep(1)
    list_label = []
    list_weight = []
    count = 0
    final_weight = 0
    taken = 0

post("baba",5,3,15)