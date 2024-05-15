import requests
import base64
import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(".env.local")

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

app = Flask(__name__)

# Get the database URI from the environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define a model for the podcast episode
class PodcastEpisode(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    uri = db.Column(db.String, nullable=False)
    release_date = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'uri': self.uri,
            'release_date': self.release_date,
        }

@app.route('/api/podcast-episodes', methods=['POST'])
def create_podcast_episode():
    data = request.json
    if not data or 'id' not in data:
        print(f"{bcolors.FAIL}Error: Invalid input{bcolors.ENDC}")
        return jsonify({'error': 'Invalid input'}), 400

    episode = PodcastEpisode(
        id=data['id'],
        name=data['name'],
        uri=data['uri'],
        release_date=data['release_date']
    )

    db.session.add(episode)
    db.session.commit()

    print(f"{bcolors.OKGREEN}Success: Podcast episode created successfully{bcolors.ENDC}")
    return jsonify({'message': 'Podcast episode created successfully'}), 201


@app.route('/api/podcast-episodes', methods=['GET'])
def get_podcast_episodes():
    episodes = PodcastEpisode.query.all()
    episodes_list = [episode.to_dict() for episode in episodes]
    print(f"{bcolors.OKGREEN}Success: Retrieved podcast episodes{bcolors.ENDC}")
    return jsonify(episodes_list), 200


@app.route('/api/podcast-episodes/<string:episode_id>', methods=['DELETE'])
def delete_podcast_episode(episode_id):
    episode = PodcastEpisode.query.get(episode_id)
    if episode:
        db.session.delete(episode)
        db.session.commit()
        print(f"{bcolors.OKGREEN}Success: Podcast episode {episode_id} deleted successfully{bcolors.ENDC}")
        return jsonify({'message': f'Podcast episode {episode_id} deleted successfully'}), 200
    else:
        print(f"{bcolors.FAIL}Error: Podcast episode not found{bcolors.ENDC}")
        return jsonify({'error': 'Podcast episode not found'}), 404


@app.route('/api/')
def health_check():
    print(f"{bcolors.OKBLUE}Info: Health check endpoint was called{bcolors.ENDC}")
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    # Create tables if they don't exist
    with app.app_context():
        db.create_all()
    print(f"{bcolors.OKCYAN}Info: Starting Flask server...{bcolors.ENDC}")
    app.run(port=3010, debug=True)