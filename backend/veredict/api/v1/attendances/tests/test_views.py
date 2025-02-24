import json

from model_bakery import baker
from rest_framework import status
from rest_framework.reverse import reverse

from veredict.attendances.models import (
    Attendance,
    AttendanceFile,
    ServicesTypesOptions,
    Note,
)


class TestAttendanceEndpoints:
    @staticmethod
    def test_get_attendance(client):
        baker.make("Attendance")
        resp = client.get(reverse("api-v1:attendance-list"))
        assert resp.status_code, status.HTTP_200_OK
        assert set(resp.json()[0]) == {
            "customer_name",
            "source",
            "document_id",
            "files",
            "id",
            "resume",
            "services_types",
            "status_resume",
            "is_client",
            "created_at",
        }

    @staticmethod
    def test_post_attendance(client):
        payload = {
            "document_id": 99999999999,
            "customer_name": "Samuel",
            "source": "Somewhere",
            "resume": "Resume description",
            "status_resume": "Status resume description",
            "services_types": [
                ServicesTypesOptions.DPVAT.value,
                ServicesTypesOptions.AUXILIO_DOENCA.value,
            ],
        }
        response = client.post(
            reverse("api-v1:attendance-list"),
            json.dumps(payload),
            content_type="application/json",
        )
        assert Attendance.objects.all().count() == 1
        assert Note.objects.all().count() == 2
        assert response.status_code == status.HTTP_201_CREATED
        assert set(response.json()) == {
            "customer_name",
            "source",
            "document_id",
            "files",
            "id",
            "resume",
            "services_types",
            "status_resume",
            "is_client",
            "created_at",
        }

    @staticmethod
    def test_patch_attendance(client, attendance, note_dpvat, note_auxilio_doenca):
        """Should remove notes based on services_types"""
        payload = {
            "document_id": 99999999999,
            "customer_name": "Samuel",
            "source": "Somewhere",
            "resume": "Resume description",
            "status_resume": "Status resume description",
            "services_types": [
                ServicesTypesOptions.DPVAT.value,
                ServicesTypesOptions.AUXILIO_ACIDENTE.value,
            ],
        }
        response = client.patch(
            reverse(
                "api-v1:attendance-detail",
                args=[attendance.pk],
            ),
            data=json.dumps(payload),
            content_type="application/json",
        )
        assert Attendance.objects.all().count() == 1
        assert (
            Note.all_objects.filter(
                attendance=attendance, deleted_at__isnull=False
            ).count()
            == 1
        )
        assert Note.objects.all().count() == 2
        assert response.status_code == status.HTTP_200_OK
        assert set(response.json()) == {
            "customer_name",
            "source",
            "document_id",
            "files",
            "id",
            "resume",
            "services_types",
            "status_resume",
            "is_client",
            "created_at",
        }

    @staticmethod
    def test_delete_attendance(client):
        attendance_file = baker.make("AttendanceFile")
        resp = client.delete(
            reverse("api-v1:attendance-detail", args=[attendance_file.attendance.pk])
        )
        assert resp.status_code == status.HTTP_204_NO_CONTENT
        assert Attendance.objects.all().count() == 0


class TestAttendanceFilters:
    @staticmethod
    def test_filter_by_attendance_name(attendances, client):
        qs = "?customer_name=ara"
        resp = client.get(f"{reverse('api-v1:attendance-list')}{qs}")
        data = resp.json()
        assert len(data) == 1

    @staticmethod
    def test_filter_by_attendance_document(attendances, client):
        qs = "?document_id=111"
        resp = client.get(f"{reverse('api-v1:attendance-list')}{qs}")
        data = resp.json()
        assert len(data) == 1

    @staticmethod
    def test_filter_by_services_types(attendances, client):
        qs = f"?services_types={ServicesTypesOptions.DPVAT}&services_types={ServicesTypesOptions.AUXILIO_DOENCA}"
        resp = client.get(f"{reverse('api-v1:attendance-list')}{qs}")
        data = resp.json()
        assert len(data) == 2


class TestAttendanceFileEndpoint:
    @staticmethod
    def test_get_attendance_file(client):
        response = client.get(reverse("api-v1:attendancefile-list"))
        assert response.status_code == status.HTTP_200_OK

    @staticmethod
    def test_post_attendance_file(client, delete_file, file):
        attendance = baker.make("Attendance")
        payload = {"attendance": attendance.pk, "file": file, "filename": file.name}
        resp = client.post(reverse("api-v1:attendancefile-list"), payload)
        attendance_file = AttendanceFile.objects.first()
        assert AttendanceFile.objects.all().count() == 1
        assert resp.status_code == status.HTTP_201_CREATED
        assert attendance_file.filename == "file.txt"

    @staticmethod
    def test_update_filename(client, delete_file, attendance_file):
        resp = client.patch(
            reverse("api-v1:attendancefile-detail", args=[attendance_file.pk]),
            data={"filename": "new-name.pdf"},
        )
        attendance_file.refresh_from_db()
        assert resp.status_code == status.HTTP_200_OK
        assert attendance_file.filename == "new-name.pdf"


def test_get_attendance_statuses(client):
    resp = client.get(reverse("api-v1:attendance-statuses"))
    assert resp.status_code == status.HTTP_200_OK
    assert resp.json() == {
        "Documentação pendente": 1,
        "Em andamento": 2,
        "À contatar": 3,
        "Concluído": 4,
    }


class TestAttendanceFilesNestedEndpoints:
    @staticmethod
    def test_list_attendance_files_by_application(client, attendance_file):
        baker.make("AttendanceFile")
        url = reverse(
            "api-v1:attendance-document-list",
            kwargs={"attendance_pk": attendance_file.attendance.pk},
        )
        resp = client.get(url)
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 1
        assert set(resp.json()[0]) == {
            "attendance",
            "file",
            "id",
            "filename",
        }


class TestAttendanceNoteNestedEndpoints:
    @staticmethod
    def test_list_attendance_notes(client, note):
        url = reverse(
            "api-v1:attendance-note-list",
            kwargs={"attendance_pk": note.attendance.pk},
        )
        resp = client.get(url)
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 1
        assert set(resp.json()[0]) == {
            "id",
            "header",
            "content",
        }

    @staticmethod
    def test_patch_attendance_note(client, note):
        url = reverse(
            "api-v1:attendance-note-detail",
            kwargs={"attendance_pk": note.attendance.pk, "pk": note.pk},
        )
        data = json.dumps({"content": "New text!"})
        resp = client.patch(url, data, content_type="application/json")
        note.refresh_from_db()
        assert note.content == "New text!"
        assert resp.status_code == status.HTTP_200_OK
        assert set(resp.json()) == {
            "id",
            "header",
            "content",
        }
