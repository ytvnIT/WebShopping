#!/usr/bin/env python
# coding: utf-8
# In[72]:
import re
import requests

product=["quan-ao-nam-259","giay-dep-nam-160","dong-ho-nam-44","tui-xach-bop-vi-nam-36","that-lung-day-nit-nam-37","phu-kien-nam-66",
        "vay-dam-nu-258","quan-ao-nu-257","dong-ho-nu-61","giay-dep-nu-161","tui-xach-bop-vi-nu-57","tui-xach-bop-vi-nu-57","phu-kien-nu-67"];
from bs4 import BeautifulSoup

def parse(w):
    innerTag_a=w.find(name="a", attrs={"class":"product-content"})
    priceSpecial= w.find(name="span", attrs={"class":"pricespecial"})
    priceOld= w.find(name="span", attrs={"class":"priceold"})
#     return w.find("span").string
    discount=w.find(name="div", attrs={"class":"discountpercent"})

    return{
         "title":innerTag_a["title"] if innerTag_a["title"] != None else "",
         "priceold":priceOld.text.strip() if priceOld != None else "",
         "pricespecial":priceSpecial.text.strip() if priceSpecial != None else "",
         "discountpercent":discount.text if discount != None else "",
         "src":innerTag_a.contents[0]["src"] if innerTag_a.contents[0]["src"] != None else "",
         "category_id":""
    }

    return innerTag_a.contents[0].parent

def get_page(name):
    arr=[]
    for x in range(9):
        url = "https://www.zanado.com/"+name+".html?delc=1&only=1&p="+str(x+1)+"&pth=d5/d5e/d5ed84b1199fd3a5d3513910131baabe"
        html = requests.get(url, headers={
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
        }).text

        soup = BeautifulSoup(html, "html.parser")

        for w in soup.find_all(name="li", attrs={"class": re.compile("^item(.+|)")}):
            arr.append(parse(w))
#         print(x)
    return arr


#         return [
# for w in soup.find_all(name="li", attrs={"class": re.compile("^item(.+|)")}):
#     parse(w)
#         ]

array=[]
i=0
for x in product:
    array.append(get_page(x))
#     print("thứ"+str(i)+"\n")
    i+=1


id=1
for x in array:
    for y in x:
        y["category_id"]=str(id)
    id=id+1

result=[]
for x in array:
    result+=x

import json
json.dump(result, open("data_shopping_ok.json","w", encoding="utf-8"), indent=4)


# In[ ]:


# In[ ]:




