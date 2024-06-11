import json
import os
import django
from django.conf import settings

# Убедитесь, что вы указали правильный путь к вашему модулю настроек
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_ecomap.settings')

# Настроить Django
django.setup()

from gis.models import Sensor, Enterprise, Substance, Indications, Pollution  # замените 'gis' на имя вашего приложения


def load_data_from_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)

        for feature in data['features']:
            properties = feature['properties']
            geometry = feature['geometry']

            substance, _ = Substance.objects.get_or_create(
                name='CO2',  # замените на нужное имя вещества
                permissible_value=50.0  # замените на нужное значение
            )

            pollution = Pollution.objects.create(
                substance=substance,
                concentration=properties['MAX'],
                coordinates=geometry['coordinates'],
                label=properties['LABEL']
            )

            print(f"Created {pollution}")


if __name__ == "__main__":
    load_data_from_json('is1.json')  # замените 'path_to_your_file.json' на путь к вашему JSON файлу
