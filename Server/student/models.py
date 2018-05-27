from django.db import models


class Student(models.Model):
    card_id = models.BigIntegerField()
    password = models.TextField()
    wechat_openid = models.TextField(null=True)
    phone = models.TextField()
    name = models.TextField()
    birth = models.DateField(null=True)
    gender = models.IntegerField(null=True)
    major = models.TextField()
    legal_id = models.TextField()
    admission_date = models.DateField(null=True)
    graduation_date = models.DateField(null=True)
    info = models.TextField(default='{}')
