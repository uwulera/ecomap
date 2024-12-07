from rest_framework import generics, viewsets
from .models import Sensor, Enterprise, Substance, Indications, Pollution
from .serializer import SensorSerializer, SubstanceSerializer, EnterpriseSerializer, IndicationsSerializer, \
    PollutionSerializer


class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


class EnterpriseViewSet(viewsets.ModelViewSet):
    queryset = Enterprise.objects.all()
    serializer_class = EnterpriseSerializer


class SubstanceViewSet(viewsets.ModelViewSet):
    queryset = Substance.objects.all()
    serializer_class = SubstanceSerializer


class IndicationsViewSet(viewsets.ModelViewSet):
    queryset = Indications.objects.all()
    serializer_class = IndicationsSerializer


class PollutionViewSet(viewsets.ModelViewSet):
    queryset = Pollution.objects.all()
    serializer_class = PollutionSerializer