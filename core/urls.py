from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='index' ),
    path('create_memorial/', views.create_memorial, name='create_memorial' ),
    path('view_memorial/<int:memorial_id>', views.create_memorial, name='view_memorial' ),
]
