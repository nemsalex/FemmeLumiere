from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import timedelta, date
from .models import Cycle, Humeur
import anthropic
from django.conf import settings

# CYCLE 
@api_view(['POST'])
def enregistrer_cycle(request):
    """Reçoit une date de règles et calcule les infos du cycle"""
    date_str = request.data.get('date_regles')
    if not date_str:
        return Response({'error': 'Date manquante'}, status=400)

    date_regles = date.fromisoformat(date_str)

    # Sauvegarde en base
    Cycle.objects.create(date_regles=date_regles)

    # Calculs
    prochaine_periode = date_regles + timedelta(days=28)
    debut_fertile = date_regles + timedelta(days=11)
    fin_fertile = date_regles + timedelta(days=16)

    return Response({
        'date_regles': str(date_regles),
        'prochaine_periode': str(prochaine_periode),
        'debut_fertile': str(debut_fertile),
        'fin_fertile': str(fin_fertile),
        'conseil': "Bois beaucoup d'eau et repose-toi bien durant tes règles. 💧",
    })


@api_view(['GET'])
def historique_cycle(request):
    """Retourne les 5 derniers cycles enregistrés"""
    cycles = Cycle.objects.order_by('-created_at')[:5]
    data = [{'date_regles': str(c.date_regles)} for c in cycles]
    return Response(data)


# HUMEUR 
@api_view(['POST'])
def enregistrer_humeur(request):
    """Enregistre l'humeur du jour"""
    humeur = request.data.get('humeur')
    note = request.data.get('note', '')

    if not humeur:
        return Response({'error': 'Humeur manquante'}, status=400)

    Humeur.objects.create(humeur=humeur, note=note)
    return Response({'message': 'Humeur enregistrée ✅'})


@api_view(['GET'])
def historique_humeur(request):
    """Retourne les humeurs des 7 derniers jours"""
    humeurs = Humeur.objects.order_by('-date')[:7]
    data = [{'humeur': h.humeur, 'date': str(h.date), 'note': h.note} for h in humeurs]
    return Response(data)

@api_view(['POST'])
def coach_ia(request):
    try:
        messages = request.data.get('messages', [])
        if not messages:
            return Response({'error': 'Messages manquants'}, status=400)

        # Filtre : garde uniquement les rôles valides
        messages_propres = [
            {'role': m['role'], 'content': m['content']}
            for m in messages
            if m.get('role') in ['user', 'assistant'] and m.get('content')
        ]

        # Le premier message doit être 'user', jamais 'assistant'
        if messages_propres and messages_propres[0]['role'] == 'assistant':
            messages_propres = messages_propres[1:]

        if not messages_propres:
            return Response({'error': 'Aucun message valide'}, status=400)

        client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            system="Tu es Coach Lumière, une assistante bienveillante de l'application Femme Lumière +, destinée aux femmes en Afrique. Tu réponds en français simple et clair. Tu aides sur 5 sujets : alphabétisation, cycle menstruel, santé du bébé, petits métiers et motivation. Tes réponses sont courtes et encourageantes. Tu tutoies l'utilisatrice.",
            messages=messages_propres,
        )

        return Response({'reponse': response.content[0].text})

    except Exception as e:
        print("ERREUR COACH IA :", str(e))
        return Response({'error': str(e)}, status=500)