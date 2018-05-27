from django.db import models


class Identification(models.Model):
    identification_code = models.TextField()
    wx_open_id = models.TextField()
    expire_at = models.BigIntegerField()
