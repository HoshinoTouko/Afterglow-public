'''
@File: urls.py
@Author: HoshinoTouko
@License: (C) Copyright 2014 - 2017, HoshinoTouko
@Contact: i@insky.jp
@Website: https://touko.moe/
@Create at: 2018-05-26 20:24
@Desc: 
'''
from django.urls import path

from . import views


urlpatterns = [
    path('get_pic', views.get_pic, name='get_pic'),
    path('register', views.register, name='register'),
    path('get_info_by_uid', views.get_info_by_uid, name='get_info_by_uid'),
]