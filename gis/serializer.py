from rest_framework import serializers
from .models import Sensor, Enterprise, Indications, Substance, Pollution


class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ['id', 'name', 'longitude', 'latitude']


class SubstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Substance
        fields = ['id', 'name', 'permissible_value']


class IndicationsSerializer(serializers.ModelSerializer):
    sensor = SensorSerializer()
    substance = SubstanceSerializer()

    class Meta:
        model = Indications
        fields = [
            'id', 'sensor', 'date_indication', 'substance',
            'concentration', 'wind_degree', 'wind_speed'
        ]

    def create(self, validated_data):
        sensor_data = validated_data.pop('sensor')
        substance_data = validated_data.pop('substance')

        sensor, _ = Sensor.objects.get_or_create(**sensor_data)
        substance, _ = Substance.objects.get_or_create(**substance_data)

        indication = Indications.objects.create(sensor=sensor, substance=substance, **validated_data)
        return indication


class EnterpriseSerializer(serializers.ModelSerializer):
    sensor = SensorSerializer()

    class Meta:
        model = Enterprise
        fields = ['id', 'name', 'longitude', 'latitude', 'sensor']

    def create(self, validated_data):
        sensor_data = validated_data.pop('sensor')
        sensor = Sensor.objects.create(**sensor_data)
        enterprise = Enterprise.objects.create(sensor=sensor, **validated_data)
        return enterprise


class PollutionSerializer(serializers.ModelSerializer):
    substance = SubstanceSerializer()

    class Meta:
        model = Pollution
        fields = ['id', 'substance', 'concentration', 'coordinates', 'label']
