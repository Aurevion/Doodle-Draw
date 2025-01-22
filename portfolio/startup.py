from flask import Flask, render_template, request, jsonify
import os
import base64

app = Flask(__name__)

# Route to display the drawing box
@app.route("/")
def draw():
    return render_template("startup.html")

# Route to save the drawing
@app.route("/save", methods=["POST"])
def save():
    data = request.json.get("image")
    if not os.path.exists("drawings"):
        os.makedirs("drawings")
    
    # Decode the base64 image and save it
    image_data = base64.b64decode(data.split(",")[1])
    file_path = os.path.join("drawings", "drawing.png")
    with open(file_path, "wb") as f:
        f.write(image_data)

    return jsonify({"message": "Image saved!", "path": file_path})

if __name__ == "__main__":
    app.run(debug=True)
