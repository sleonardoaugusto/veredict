from datetime import datetime

from veredict.image_processing.services.city_codes import CITY_CODE_MAPPING


def map_city_code(city_name: str):
    codes = []
    for code, cities in CITY_CODE_MAPPING.items():
        if city_name.upper() in cities:
            codes.append(code)

    if codes:
        return codes

    raise ValueError(f"No codes found for {city_name}")


def convert_date_format(text: str):
    date = datetime.strptime(text, "%d/%m/%Y")
    return date.strftime("%Y%m%d")


def parse_ocr(ocr: str):
    return ocr.zfill(5)
