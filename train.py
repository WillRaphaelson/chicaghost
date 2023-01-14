import requests

url = "https://cta-delay-preds-ijzgin3xfq-uc.a.run.app/alerts"

r = requests.get(url)

load = r.json()

len(load["alerts"])

app_array = []
for _ , i in enumerate(load["alerts"]):
    app_array += [{ "id":  _,
                   "service_name": i["ServiceName"], 
                   "description" : i["FullDescription"],
                   "duration": i["Duration"],
                   }]

len(app_array)