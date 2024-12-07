import json
import os
import django
from django.conf import settings

# Убедитесь, что вы указали правильный путь к вашему модулю настроек
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_ecomap.settings')

# Настроить Django
django.setup()

from gis.models import Sensor  # замените 'gis' на имя вашего приложения

def load_sensors_from_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)

        for feature in data['features']:
            geometry = feature['geometry']
            coordinates = geometry['coordinates']

            sensor = Sensor.objects.create(
                name=f"Sensor {Sensor.objects.count() + 1}",
                longitude=coordinates[0],
                latitude=coordinates[1]
            )

            print(f"Created {sensor}")

if __name__ == "__main__":
    load_sensors_from_json('sensors.json')
