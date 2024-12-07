# gis/urls.py

from drf_yasg.views import get_schema_view
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SensorViewSet, EnterpriseViewSet, SubstanceViewSet, IndicationsViewSet, PollutionViewSet

router = DefaultRouter()
router.register(r'sensors', SensorViewSet)
router.register(r'enterprises', EnterpriseViewSet)
router.register(r'substances', SubstanceViewSet)
router.register(r'indications', IndicationsViewSet)
router.register(r'pollutions', PollutionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
