from django.contrib import admin

from veredict.core.models import UserAllowed


@admin.register(UserAllowed)
class UserAllowedAdmin(admin.ModelAdmin):
    pass
