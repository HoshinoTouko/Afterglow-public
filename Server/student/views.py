from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from identification.service import get_wx_openid

import error


def index(request):
    return HttpResponse('App running...')


def auth(request):
    if request.method not in ['POST', 'GET']:
        raise error.method_not_allowed

    if request.method == 'POST':
        wx_code = request.POST.get('code')
    else:
        wx_code = request.GET.get('code')

    return JsonResponse(get_wx_openid(wx_code))
