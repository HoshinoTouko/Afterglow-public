'''
@File: urls.py
@Author: HoshinoTouko
@License: (C) Copyright 2014 - 2017, HoshinoTouko
@Contact: i@insky.jp
@Website: https://touko.moe/
@Create at: 2018-05-26 13:03
@Desc: 
'''
from django.urls import path

from . import views

urlpatterns = [
    path('get_id_code', views.get_id_code, name='get_id_code'),
    path('check_id_code', views.check_id_code, name='check_id_code'),
    path('check_wx_code', views.check_wx_code, name='check_code'),
]
