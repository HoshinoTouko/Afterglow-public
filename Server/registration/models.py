from django.db import models


class Registration(models.Model):
    card_id = models.BigIntegerField()
    name = models.TextField()
    major = models.TextField()
    legal_id = models.TextField()

    unique_identifier = models.TextField()
