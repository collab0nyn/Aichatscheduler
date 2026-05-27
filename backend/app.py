import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv
from nlp_engine import extract_tasks, summarize

load_dotenv()

app = Flask(__name__)
CORS(app)

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))


# POST /api/extract — extract tasks and save to Supabase
@app.route("/api/extract", methods=["POST"])
def extract():
    text = request.json.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    tasks   = extract_tasks(text)
    summary = summarize(text)

    # Save action plan to Supabase
    plan = supabase.table("action_plans").insert({
        "title": summary[:60],
        "raw_text": text,
        "summary": summary
    }).execute()

    plan_id = plan.data[0]["id"]

    # Save each task linked to the plan
    for t in tasks:
        t["plan_id"] = plan_id
    supabase.table("tasks").insert(tasks).execute()

    return jsonify({"tasks": tasks, "summary": summary, "plan_id": plan_id})


# GET /api/plans — fetch all saved action plans
@app.route("/api/plans", methods=["GET"])
def get_plans():
    plans = supabase.table("action_plans").select("*").execute()
    return jsonify(plans.data)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))