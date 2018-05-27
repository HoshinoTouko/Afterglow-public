'''
@File: service.py
@Author: HoshinoTouko
@License: (C) Copyright 2014 - 2017, HoshinoTouko
@Contact: i@insky.jp
@Website: https://touko.moe/
@Create at: 2018-05-26 12:25
@Desc: 
'''
from identification.models import Identification

import json

import config
import requests
import time
import random
import base64


def create_identification(open_id, name, life=60):
    now_time = int(time.time())

    rand_identification_code = hex(int(random.random() * 1E16))
    identification_code = json.dumps({
        'name': name,
        'identification_code': str(rand_identification_code)
    })
    identification = Identification.objects.create(
        identification_code=base64.b64encode(
            identification_code.encode(encoding="utf-8")).decode(),
        wx_open_id=open_id,
        expire_at=now_time+life,
    )
    return identification


def check_expire_identifications(open_id=0):
    if open_id == 0:
        identifications = Identification.objects.all()
    else:
        identifications = Identification.objects.filter(wx_open_id=open_id)

    now_time = int(time.time())
    for identification in identifications:
        if identification.expire_at <= now_time:
            identification.delete()


def check_identification(id_code):
    check_expire_identifications()
    validated_ids = Identification.objects.filter(identification_code=id_code)
    if len(validated_ids) > 0:
        validated_ids[0].delete()
        return True
    return False


def get_wx_openid(wx_code):
    wx_auth_url = 'https://api.weixin.qq.com/sns/jscode2session'
    payload = {
        'appid': config.wx_app_id,
        'secret': config.wx_app_secret,
        'js_code': wx_code,
        'grant_type': 'authorization_code',
    }
    r = requests.get(wx_auth_url, params=payload)
    return json.loads(r.content)
