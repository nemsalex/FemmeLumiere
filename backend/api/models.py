from django.db import models

# Modèle pour le suivi du cycle menstruel
class Cycle(models.Model):
    date_regles = models.DateField()  # date de début des règles
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cycle du {self.date_regles}"

# Modèle pour le suivi de l'humeur
class Humeur(models.Model):
    HUMEURS = [
        ('joyeuse', ' Joyeuse'),
        ('triste', ' Triste'),
        ('fatiguee', ' Fatiguée'),
        ('stressee', ' Stressée'),
        ('calme', ' Calme'),
    ]
    humeur = models.CharField(max_length=20, choices=HUMEURS)
    date = models.DateField(auto_now_add=True)
    note = models.TextField(blank=True)

    def __str__(self):
        return f"{self.humeur} - {self.date}"