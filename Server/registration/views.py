from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .service import get_token, get_registration_pic
from .models import Registration
from student.models import Student
from identification.service import get_wx_openid

import error
import hashlib


def get_pic(request):
    if request.method not in ['POST', 'GET']:
        raise error.method_not_allowed

    if request.method == 'POST':
        unique_id = request.POST.get('unique_id')
    else:
        unique_id = request.GET.get('unique_id')

    if not unique_id:
        return JsonResponse({'err': 1, 'msg': 'No unique_id'})

    registrations = Registration.objects.filter(unique_identifier=unique_id)
    if len(registrations) == 0:
        return JsonResponse({'err': 1, 'msg': 'Registration id invalid.'})

    # token = get_token()
    pic = get_registration_pic(unique_id)
    return HttpResponse(b'<img src="data:image/jpeg;base64,%s" />' % pic)


def get_info_by_uid(request):
    if request.method not in ['POST', 'GET']:
        raise error.method_not_allowed

    if request.method == 'POST':
        unique_id = request.POST.get('unique_id')
    else:
        unique_id = request.GET.get('unique_id')

    if not unique_id:
        return JsonResponse({'err': 1, 'msg': 'No unique_id'})

    registrations = Registration.objects.filter(unique_identifier=unique_id)
    if len(registrations) == 0:
        return JsonResponse({'err': 1, 'msg': 'Registration id invalid.'})
    reg = registrations[0]
    return JsonResponse({
        'err': 0,
        'card_id': reg.card_id,
        'name': reg.name,
        'major': reg.major,
    })


def register(request):
    if request.method not in ['POST', 'GET']:
        raise error.method_not_allowed

    if request.method == 'POST':
        instance = request.POST
    else:
        instance = request.GET

    unique_id = instance.get('unique_id')
    legal_id = instance.get('legal_id')
    password = instance.get('password')
    phone = instance.get('phone')
    code = instance.get('code')

    open_id = get_wx_openid(code).get('openid')
    if not open_id:
        return JsonResponse({'err': 1, 'msg': 'WX not login.'})

    registrations = Registration.objects.filter(unique_identifier=unique_id)
    if len(registrations) == 0:
        return JsonResponse({'err': 1, 'msg': 'Registration id invalid.'})

    registration = registrations[0]
    if registration.legal_id != legal_id:
        return JsonResponse({'err': 1, 'msg': '身份证错误'})

    try:
        hash_instance = hashlib.sha512()
        hash_instance.update(password.encode('utf-8'))
        Student.objects.create(
            card_id=registration.card_id,
            password=hash_instance.hexdigest(),
            wechat_openid=open_id,
            phone=phone,
            name=registration.name,
            major=registration.major,
            legal_id=registration.legal_id
        )
        registration.delete()
        return JsonResponse({'err': 0, 'msg': 'Register succeed!'})
    except Exception as e:
        return JsonResponse({'err': 1, 'msg': str(e)})
