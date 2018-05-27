from django.shortcuts import render
from django.http import JsonResponse
from student.models import Student
from identification.models import Identification
from identification.service \
    import get_wx_openid, \
    create_identification, \
    check_expire_identifications, \
    check_identification

import error


def check_id_code(request):
    if request.method not in ['POST', 'GET']:
        raise error.method_not_allowed

    if request.method == 'POST':
        id_code = request.POST.get('id_code')
    else:
        id_code = request.GET.get('id_code')

    if not id_code:
        return JsonResponse({'err': 1, 'msg': 'No id_code'})

    if check_identification(id_code):
        return JsonResponse({'err': 0, 'msg': 'Validated'})
    return JsonResponse({'err': 1, 'msg': 'Not validated'})


def get_id_code(request):
    if request.method not in ['POST', 'GET']:
        raise error.method_not_allowed

    if request.method == 'POST':
        wx_code = request.POST.get('code')
    else:
        wx_code = request.GET.get('code')

    res = get_wx_openid(wx_code)
    if not res.get('openid'):
        return JsonResponse({'err': 1, 'msg': 'WX login error'})

    if not wx_code:
        return JsonResponse({'err': 1, 'msg': 'No wx_code'})

    open_id = res.get('openid')
    check_expire_identifications(open_id)
    student = Student.objects.filter(wechat_openid=open_id)
    if len(student) == 0:
        return JsonResponse({'err': 1, 'msg': 'Student not bind.', 'open_id': open_id})

    id_code = create_identification(open_id, student[0].name).identification_code

    return JsonResponse({'err': 0, 'id_code': id_code})


def check_wx_code(request):
    if request.method not in ['POST', 'GET']:
        raise error.method_not_allowed

    if request.method == 'POST':
        wx_code = request.POST.get('code')
    else:
        wx_code = request.GET.get('code')

    if not wx_code:
        return JsonResponse({'err': 1, 'msg': 'No wx_code'})

    res = get_wx_openid(wx_code)
    if not res.get('openid'):
        return JsonResponse({'err': 1, 'msg': 'WX login error'})
    open_id = res.get('openid')
    student = Student.objects.filter(wechat_openid=open_id)
    if len(student) == 0:
        return JsonResponse({'err': 1, 'msg': 'Student not bind.'})
    return JsonResponse({'err': 0, 'msg': 'Student exists.'})
