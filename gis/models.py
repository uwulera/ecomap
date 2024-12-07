# gis/models.py

from django.db import models


class Sensor(models.Model):
    name = models.CharField(max_length=255)
    longitude = models.FloatField()
    latitude = models.FloatField()

    def __str__(self):
        return self.name


class Enterprise(models.Model):
    name = models.CharField(max_length=255)
    longitude = models.FloatField()
    latitude = models.FloatField()
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='enterprises')

    def __str__(self):
        return self.name


class Substance(models.Model):
    name = models.CharField(max_length=255)
    permissible_value = models.FloatField()

    def __str__(self):
        return self.name


class Indications(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='indications')
    date_indication = models.DateTimeField()
    substance = models.ForeignKey(Substance, on_delete=models.CASCADE, related_name='indications')
    concentration = models.FloatField()
    wind_degree = models.IntegerField()
    wind_speed = models.IntegerField()

    def __str__(self):
        return f"Indication {self.date_indication} for {self.sensor.name}"


class Pollution(models.Model):
    substance = models.ForeignKey(Substance, on_delete=models.CASCADE, related_name='pollutions')
    concentration = models.FloatField()
    coordinates = models.JSONField()
    label = models.CharField(max_length=255)

    def __str__(self):
        return f"Pollution {self.label} with concentration {self.concentration}"
