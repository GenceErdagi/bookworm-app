from django.contrib import admin
from .models import Review, UserProfile
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(UserProfile, UserAdmin)
admin.site.register(Review)