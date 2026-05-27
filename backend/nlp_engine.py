import re
import spacy

nlp = spacy.load("en_core_web_sm")

def extract_tasks(text):
    tasks = []
    sentences = text.split(".")

    action_verbs = ["prepare", "complete", "submit", "check", "do",
                    "send", "review", "finish", "update", "write",
                    "create", "build", "fix", "test", "deploy"]

    priority_high = ["urgent", "asap", "immediately", "critical", "today"]
    priority_low  = ["eventually", "when possible", "low priority"]

    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue

        # Detect action verb
        task_text = None
        for verb in action_verbs:
            if verb in sentence.lower():
                task_text = sentence
                break

        if not task_text:
            continue

        # Extract person using spaCy
        doc = nlp(sentence)
        person = "Unassigned"
        for ent in doc.ents:
            if ent.label_ == "PERSON":
                person = ent.text
                break

        # Extract deadline
        deadline_match = re.search(
            r'by\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tomorrow|\d{1,2}[\/\-]\d{1,2})',
            sentence, re.IGNORECASE
        )
        deadline = deadline_match.group(0) if deadline_match else "No deadline"

        # Detect priority
        priority = "Medium"
        if any(w in sentence.lower() for w in priority_high):
            priority = "High"
        elif any(w in sentence.lower() for w in priority_low):
            priority = "Low"

        tasks.append({
            "person": person,
            "task": task_text,
            "deadline": deadline,
            "priority": priority
        })

    return tasks


def summarize(text):
    sentences = text.split(".")
    action_words = ["prepare", "submit", "send", "review", "complete",
                    "finish", "update", "build", "fix", "check"]

    scored = []
    for s in sentences:
        s = s.strip()
        if not s:
            continue
        score = sum(1 for w in action_words if w in s.lower())
        scored.append((score, s))

    scored.sort(reverse=True)
    top = [s for _, s in scored[:3]]
    return ". ".join(top)