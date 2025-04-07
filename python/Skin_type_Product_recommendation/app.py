import streamlit as st
import pickle
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

st.set_page_config(page_title="GlamEase - Skin Care Product Recommender", layout="wide")

# Custom CSS with top & bottom padding
st.markdown("""
    <style>
    .recommend-card {
        background-color: #e0f2f1;
        border: 1px solid #b2dfdb;
        border-radius: 14px;
        height: 440px;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.06);
        padding: 30px 20px; /* Top-Bottom: 30px, Left-Right: 20px */
        box-sizing: border-box;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .recommend-card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 10px;
    }
    .recommend-card h4 {
        color: #00695c;
        font-size: 16px;
        margin: 10px 0 4px;
    }
    .recommend-card p {
        margin: 4px 0;
        font-size: 14px;
        color: #37474f;
    }
    .recommend-card button {
        background-color: #00897b;
        color: white;
        border: none;
        padding: 8px 14px;
        border-radius: 8px;
        cursor: pointer;
    }
    .recommend-card button:hover {
        background-color: #00695c;
    }
    </style>
""", unsafe_allow_html=True)

# Default image fallback URL
DEFAULT_IMAGE = "https://vaadiherbals.in/cdn/shop/files/AssortedPackof4HerbalFaceWash_240ml.jpg?v=1715766269"

# Load model & data
try:
    with open('tfidf_vectorizer.pkl', 'rb') as f:
        tfidf_vectorizer = pickle.load(f)
    with open('recommendation_df.pkl', 'rb') as f:
        df = pickle.load(f)
except FileNotFoundError:
    st.error("Missing files!")
    st.stop()

if 'text' not in df.columns:
    df['text'] = (df['description'].fillna('') + ' ' + df['notable_effects'].fillna('')).str.lower()

df['skintype'] = df['skintype'].fillna('').astype(str)

def recommend_products(product_type, skintype, min_price, max_price, top_n=10):
    base_df = df[
        (df['product_type'].str.lower() == product_type.lower()) &
        (df['skintype'].str.lower().str.contains(skintype.lower()))
    ]

    if base_df.empty:
        return []

    tfidf_matrix = tfidf_vectorizer.transform(base_df['text'])
    user_text = f"{product_type} {skintype}"
    user_vector = tfidf_vectorizer.transform([user_text])
    similarity = cosine_similarity(user_vector, tfidf_matrix).flatten()

    base_df = base_df.copy()
    base_df['similarity'] = similarity

    filtered_df = base_df[(base_df['price'] >= min_price) & (base_df['price'] <= max_price)]

    top_df = filtered_df.sort_values(by='similarity', ascending=False).head(top_n)

    recommendations = []
    for _, row in top_df.iterrows():
        image_url = row.get('picture_src')
        # Check if image_url is missing, NaN, or blank
        if not image_url or pd.isna(image_url) or image_url.strip() == '':
            image_url = DEFAULT_IMAGE

        recommendations.append({
            'product_name': row['product_name'],
            'price': row['price'],
            'picture_src': image_url,
            'similarity_score': row['similarity']
        })
    return recommendations

# UI
st.title("GlamEase - Skin Care Product Recommender")

col1, col2, col3 = st.columns(3)
with col1:
    product_type = st.selectbox("Select Product Type", sorted(df['product_type'].dropna().unique()))
with col2:
    skintype = st.selectbox("Select Skin Type", sorted(df['skintype'].dropna().unique()))
with col3:
    price_range = st.slider("Price Range (₹)", 0, 5000, (200, 1500), step=50)

if st.button("✨ Get Recommendations"):
    min_price, max_price = price_range
    recommendations = recommend_products(product_type, skintype, min_price, max_price)

    if recommendations:
        st.subheader("🧴 Top 10 Similar Products")

        for i in range(0, len(recommendations), 3):
            row_recs = recommendations[i:i+3]
            cols = st.columns(3)
            for col, rec in zip(cols, row_recs):
                with col:
                    st.markdown(f"""
                        <div class="recommend-card">
                            <img src="{rec['picture_src']}" onerror="this.onerror=null;this.src='{DEFAULT_IMAGE}';" />
                            <h4>{rec['product_name']}</h4>
                            <p>💰 ₹{rec['price']:.2f}</p>
                            <p>📈 Similarity: {rec['similarity_score']:.3f}</p>
                            <button>🛒 Add to Cart</button>
                        </div>
                    """, unsafe_allow_html=True)
    else:
        st.warning("No products found for your selection.")
