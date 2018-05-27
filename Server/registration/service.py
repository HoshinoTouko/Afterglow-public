'''
@File: service.py
@Author: HoshinoTouko
@License: (C) Copyright 2014 - 2017, HoshinoTouko
@Contact: i@insky.jp
@Website: https://touko.moe/
@Create at: 2018-05-26 20:31
@Desc: 
'''
import requests
import config
import json
import base64
import qrcode
import io
import time


def get_token():
    token_url = 'https://api.weixin.qq.com/cgi-bin/token'

    params = {
        'appid': config.wx_app_id,
        'secret': config.wx_app_secret,
        'grant_type': 'client_credential'
    }
    r = requests.get(
        token_url, params=params
    )
    return json.loads(r.content).get('access_token')


def get_registration_pic(unique_id, token=''):
    url = 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=%s' % token
    post_data = {
        'path': 'pages/registration/registration?uid=%s' % unique_id
    }

    data = {
        'registration': 'CampusOnline',
        'type': 'unique_identifier',
        'create_at': int(time.time()),
        'unique_id': unique_id
    }
    buffer = io.BytesIO()
    qrcode_pic = qrcode.make(base64.b64encode(json.dumps(data).encode()))
    qrcode_pic.save(buffer, 'jpeg')
    return base64.b64encode(buffer.getvalue())
