from flask import Flask, request, jsonify
import subprocess
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate-map', methods=['POST'])
def generate_map():
    try:
        data = request.get_json()
        addresses = data.get('points', [])

        # Chemin du script Python et du fichier de sortie
        script_path = 'mapplan.py'
        output_file = os.path.join('htmlFiles', 'trajet.html')

        # Exécute le script Python avec les adresses comme arguments
        result = subprocess.run(['python', script_path] + addresses, capture_output=True, text=True)

        # Vérifie si le fichier de sortie existe
        if os.path.exists(output_file):
            return jsonify({
                'output': result.stdout,
                'error': result.stderr,
                'file': output_file,
                'status': 'success' if result.returncode == 0 else 'error'
            })
        else:
            return jsonify({
                'output': result.stdout,
                'error': result.stderr,
                'file': 'File not found',
                'status': 'error'
            })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'failed'})

if __name__ == '__main__':
    app.run(debug=True)



#to run flask app               flask run