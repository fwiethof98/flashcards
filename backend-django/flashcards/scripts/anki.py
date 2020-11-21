# split anki
# from ..cards.models import Card


def convert_to_flashcard(file):
    f = open(file, "r")
    cards = []
    questions = []
    answers = []

    data = f.readlines()

    for i in range(len(data)):
        data[i] = data[i].replace('"', "")
        data[i] = data[i].replace("</div>", "")
        data[i] = data[i].replace("<div>", "\n")
        data[i] = data[i].replace("<br>", "")
        data[i] = data[i].replace("&nbsp;", " ")

    for card in data:
        data = card.split("\t")
        questions.append(data[0])
        answers.append(data[1])

    return {"questions": questions, "answers": answers}
