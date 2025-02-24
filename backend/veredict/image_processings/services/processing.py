from veredict.image_processings.models import Processing


def get_processing(pk: int):
    return Processing.objects.get(pk=pk)
