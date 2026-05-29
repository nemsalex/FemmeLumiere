from django.urls import path
from . import views

urlpatterns = [
    path('cycle/', views.enregistrer_cycle, name='enregistrer_cycle'),
    path('cycle/historique/', views.historique_cycle, name='historique_cycle'),
    path('humeur/', views.enregistrer_humeur, name='enregistrer_humeur'),
    path('humeur/historique/', views.historique_humeur, name='historique_humeur'),
    path('coach/', views.coach_ia, name='coach_ia'),
]