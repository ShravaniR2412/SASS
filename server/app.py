from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import os
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# Load the recommendation model and data
model_path = "C:/Glamease-final/SASS/python/Skin_type_Product_recommendation"
recommendation_df = pd.read_pickle(os.path.join(model_path, 'recommendation_df.pkl'))
tfidf_vectorizer = pickle.load(open(os.path.join(model_path, 'tfidf_vectorizer.pkl'), 'rb'))

# Default image fallback URL
DEFAULT_IMAGE = "https://vaadiherbals.in/cdn/shop/files/AssortedPackof4HerbalFaceWash_240ml.jpg?v=1715766269"

# Prepare the data
if 'text' not in recommendation_df.columns:
    recommendation_df['text'] = (recommendation_df['description'].fillna('') + ' ' + 
                               recommendation_df['notable_effects'].fillna('')).str.lower()

recommendation_df['skintype'] = recommendation_df['skintype'].fillna('').astype(str)

def recommend_products(product_type, skintype, max_price, top_n=10):
    base_df = recommendation_df[
        (recommendation_df['product_type'].str.lower() == product_type.lower()) &
        (recommendation_df['skintype'].str.lower().str.contains(skintype.lower()))
    ]

    if base_df.empty:
        return []

    tfidf_matrix = tfidf_vectorizer.transform(base_df['text'])
    user_text = f"{product_type} {skintype}"
    user_vector = tfidf_vectorizer.transform([user_text])
    similarity = cosine_similarity(user_vector, tfidf_matrix).flatten()

    base_df = base_df.copy()
    base_df['similarity'] = similarity

    filtered_df = base_df[base_df['price'] <= max_price]
    top_df = filtered_df.sort_values(by='similarity', ascending=False).head(top_n)

    recommendations = []
    for _, row in top_df.iterrows():
        image_url = row.get('picture_src')
        if not image_url or pd.isna(image_url) or image_url.strip() == '':
            image_url = DEFAULT_IMAGE

        recommendations.append({
            'id': row.name,  # Using index as ID
            'name': row['product_name'],
            'image': image_url,
            'price': float(row['price']),
            'similarity': float(row['similarity'])
        })
    return recommendations

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.json
        product_type = data.get('productType')
        skin_type = data.get('skinType')
        price_range = float(data.get('priceRange'))

        recommendations = recommend_products(product_type, skin_type, price_range)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 