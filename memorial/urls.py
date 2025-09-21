from django.urls import path
from . import views

app_name = 'memorial'

urlpatterns = [
    path('', views.index, name='index' ),
    path('create_memorial/', views.create_memorial, name='create_memorial' ),
    path('view_memorial/<int:memorial_id>', views.create_memorial, name='view_memorial' ),
    path('view_beamer_memorial/<int:memorial_id>', views.view_beamer_memorial, name="view_beamer_memorial"),
    path('view_ar_memorial/<int:memorial_id>', views.view_ar_memorial, name="view_ar_memorial"),
]
