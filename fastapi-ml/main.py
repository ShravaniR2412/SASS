# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import pandas as pd
# from mlxtend.frequent_patterns import apriori, association_rules
# import os
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI(title="GLAMEASE Recommender - Model 1")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # ⛔️ In production, use: ["http://localhost:3000"] or your domain
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # Load transaction data
# def load_data(path):
#     df = pd.read_csv(path)
#     transactions = df.values.tolist()
#     transactions = [[str(item).strip() for item in row if pd.notna(item) and str(item).strip() != ''] for row in transactions]
#     return transactions

# def encode_transactions(transactions):
#     all_items = sorted(set(item for txn in transactions for item in txn))
#     encoded_df = pd.DataFrame(0, index=range(len(transactions)), columns=all_items)
#     for i, txn in enumerate(transactions):
#         for item in set(txn):
#             encoded_df.at[i, item] = 1
#     return encoded_df

# # Load transaction and product metadata
# transactions = load_data("improved_fake_transactions_with_patterns.csv")
# encoded_df = encode_transactions(transactions)

# print("Starting apriori...")
# frequent_itemsets = apriori(encoded_df, min_support=0.01, use_colnames=True)
# print("Apriori done.")

# print("Starting association_rules...")
# rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.2)
# print("Association rules done.")
# # frequent_itemsets = apriori(encoded_df, min_support=0.01, use_colnames=True)
# # rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.2)
# rules['antecedents'] = rules['antecedents'].apply(list)
# rules['consequents'] = rules['consequents'].apply(list)

# # 🧠 Load product metadata with images
# product_info_df = pd.read_csv("MP-Skin Care Product_Recommendation_System3.csv")
# product_info_df['product_name'] = product_info_df['product_name'].str.lower().str.strip()

# # Input model
# class ProductRequest(BaseModel):
#     product: str
#     top_n: int = 5

# # Core recommendation logic
# def get_recommendations(product: str, top_n: int):
#     recommendations = set()
#     for _, row in rules.iterrows():
#         if product in row['antecedents']:
#             for item in row['consequents']:
#                 if item != product:
#                     recommendations.add((
#                         item,
#                         round(row['confidence'], 2),
#                         round(row['lift'], 2),
#                         round(row['support'], 3)
#                     ))
#     recommendations = sorted(list(recommendations), key=lambda x: (x[1], x[2]), reverse=True)
#     return recommendations[:top_n]

# # Image fetch helper
# def get_image_url(product_name: str):
#     product_name = product_name.lower().strip()
#     match = product_info_df[product_info_df['product_name'] == product_name]
#     if not match.empty:
#         return match.iloc[0]['picture_src']
#     return None

# # Main route
# @app.post("/predict/mba")
# def recommend_products(req: ProductRequest):
#     product = req.product.strip()
#     top_n = req.top_n

#     if product not in encoded_df.columns:
#         raise HTTPException(status_code=404, detail=f"Product '{product}' not found in dataset.")

#     recommendations = get_recommendations(product, top_n)
#     num_purchases = int(encoded_df[product].sum())

#     response = {
#         "input_product": product,
#         "bought_by_customers": num_purchases,
#         "recommendations": []
#     }

#     for item, confidence, lift, support in recommendations:
#         image_url = get_image_url(item)
#         response["recommendations"].append({
#             "item": item,
#             "confidence": confidence,
#             "lift": lift,
#             "support": support,
#             "image_url": image_url
#         })

#     return response


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
import pickle
import os
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import sys

app = FastAPI(title="GLAMEASE Recommender System")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
DEFAULT_IMAGE = "https://vaadiherbals.in/cdn/shop/files/AssortedPackof4HerbalFaceWash_240ml.jpg?v=1715766269"
BASE_DIR = Path(__file__).parent.parent  # Goes up from fastapi to SAAS directory

# ===== Helper Functions =====
def load_data_safely(file_path):
    """Load data with proper error handling"""
    try:
        return pd.read_csv(file_path)
    except Exception as e:
        print(f"Error loading file {file_path}: {e}")
        raise

# ===== MBA Recommender =====
print("Loading MBA data...")
try:
    # Load transaction data
    transactions = load_data_safely(BASE_DIR / "fastapi-ml" / "improved_fake_transactions_with_patterns.csv")
    transactions = transactions.values.tolist()
    transactions = [[str(item).strip() for item in row if pd.notna(item) and str(item).strip() != ''] for row in transactions]
    
    # Encode transactions
    all_items = sorted(set(item for txn in transactions for item in txn))
    mba_encoded_df = pd.DataFrame(0, index=range(len(transactions)), columns=all_items)
    for i, txn in enumerate(transactions):
        for item in set(txn):
            mba_encoded_df.at[i, item] = 1
    
    # Load product metadata
    mba_product_info_df = load_data_safely(BASE_DIR / "fastapi-ml" / "MP-Skin Care Product_Recommendation_System3.csv")
    mba_product_info_df['product_name'] = mba_product_info_df['product_name'].str.lower().str.strip()
    
    # Generate association rules
    print("Generating MBA association rules...")
    mba_frequent_itemsets = apriori(mba_encoded_df, min_support=0.01, use_colnames=True)
    mba_rules = association_rules(mba_frequent_itemsets, metric="confidence", min_threshold=0.2)
    mba_rules['antecedents'] = mba_rules['antecedents'].apply(list)
    mba_rules['consequents'] = mba_rules['consequents'].apply(list)
    
    print(f"MBA data loaded successfully with {len(mba_rules)} rules")
except Exception as e:
    print(f"Failed to initialize MBA recommender: {e}")
    sys.exit(1)

# ===== Skin Type Recommender =====
print("Loading skin type recommendation data...")
try:
    SKIN_TYPE_MODEL_PATH = BASE_DIR / "python" / "skin_type_Product_recommendation"
    print(f"Looking for model files in: {SKIN_TYPE_MODEL_PATH}")
    
    # Verify files exist
    if not (SKIN_TYPE_MODEL_PATH / "recommendation_df.pkl").exists():
        raise FileNotFoundError(f"recommendation_df.pkl not found in {SKIN_TYPE_MODEL_PATH}")
    if not (SKIN_TYPE_MODEL_PATH / "tfidf_vectorizer.pkl").exists():
        raise FileNotFoundError(f"tfidf_vectorizer.pkl not found in {SKIN_TYPE_MODEL_PATH}")
    
    skin_recommendation_df = pd.read_pickle(SKIN_TYPE_MODEL_PATH / "recommendation_df.pkl")
    skin_tfidf_vectorizer = pickle.load(open(SKIN_TYPE_MODEL_PATH / "tfidf_vectorizer.pkl", "rb"))
    
    # Prepare skin type data
    if 'text' not in skin_recommendation_df.columns:
        skin_recommendation_df['text'] = (skin_recommendation_df['description'].fillna('') + ' ' + 
                                        skin_recommendation_df['notable_effects'].fillna('')).str.lower()
    skin_recommendation_df['skintype'] = skin_recommendation_df['skintype'].fillna('').astype(str)
    
    print("Skin type recommender loaded successfully")
except Exception as e:
    print(f"Failed to initialize Skin Type recommender: {e}")
    sys.exit(1)

# ===== Models =====
class ProductRequest(BaseModel):
    product: str
    top_n: int = 5

class SkinTypeRequest(BaseModel):
    productType: str
    skinType: str
    priceRange: float
    top_n: int = 10

# ===== API Endpoints =====
@app.post("/predict/mba")
async def mba_recommendations(req: ProductRequest):
    """Market Basket Analysis recommendations"""
    try:
        product = req.product.strip()
        top_n = req.top_n

        # Debug output
        print(f"Searching for product: {product}")
        print(f"First 5 products in dataset: {list(mba_encoded_df.columns)[:5]}")

        if product not in mba_encoded_df.columns:
            # Find similar products
            similar = [name for name in mba_encoded_df.columns if product.lower() in name.lower()]
            raise HTTPException(
                status_code=404,
                detail={
                    "error": f"Product '{product}' not found in dataset",
                    "suggestions": similar[:5] if similar else []
                }
            )

        recommendations = set()
        for _, row in mba_rules.iterrows():
            if product in row['antecedents']:
                for item in row['consequents']:
                    if item != product:
                        recommendations.add((
                            item,
                            round(row['confidence'], 2),
                            round(row['lift'], 2),
                            round(row['support'], 3)
                        ))

        recommendations = sorted(list(recommendations), key=lambda x: (x[1], x[2]), reverse=True)[:top_n]
        num_purchases = int(mba_encoded_df[product].sum())

        response = {
            "input_product": product,
            "bought_by_customers": num_purchases,
            "recommendations": []
        }

        for item, confidence, lift, support in recommendations:
            image_url = None
            try:
                if not mba_product_info_df[mba_product_info_df['product_name'].str.lower() == item.lower()].empty:
                    image_url = mba_product_info_df.loc[
                        mba_product_info_df['product_name'].str.lower() == item.lower(),
                        'picture_src'
                    ].iloc[0]
            except Exception as e:
                print(f"Error getting image for {item}: {e}")
            
            response["recommendations"].append({
                "item": item,
                "confidence": confidence,
                "lift": lift,
                "support": support,
                "image_url": image_url if image_url and not pd.isna(image_url) and str(image_url).strip() != '' else DEFAULT_IMAGE
            })

        return response

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in MBA recommendations: {e}")

        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/skin-type")
async def skin_type_recommendations(req: SkinTypeRequest):
    """Skin type based product recommendations"""
    try:
        product_type = req.productType.strip().lower()
        skintype = req.skinType.strip().lower()
        max_price = float(req.priceRange)
        top_n = req.top_n

        # Filter products
        base_df = skin_recommendation_df[
            (skin_recommendation_df['product_type'].str.lower() == product_type) &
            (skin_recommendation_df['skintype'].str.lower().str.contains(skintype))
        ]
        
        if base_df.empty:
            base_df = skin_recommendation_df[
                (skin_recommendation_df['product_type'].str.lower().str.contains(product_type)) |
                (skin_recommendation_df['skintype'].str.lower().str.contains(skintype))
            ]
        
        if base_df.empty:
            base_df = skin_recommendation_df.copy()

        # Calculate similarity
        tfidf_matrix = skin_tfidf_vectorizer.transform(base_df['text'])
        user_text = f"{product_type} {skintype}"
        user_vector = skin_tfidf_vectorizer.transform([user_text])
        similarity = cosine_similarity(user_vector, tfidf_matrix).flatten()

        base_df = base_df.copy()
        base_df['similarity'] = similarity

        # Filter by price and get top N
        filtered_df = base_df[base_df['price'] <= max_price]
        if filtered_df.empty:
            filtered_df = base_df
        
        top_df = filtered_df.sort_values(by='similarity', ascending=False).head(top_n)

        recommendations = []
        for _, row in top_df.iterrows():
            image_url = row.get('picture_src', DEFAULT_IMAGE)
            recommendations.append({
                'id': row.name,
                'name': row['product_name'],
                'image': image_url if not pd.isna(image_url) and str(image_url).strip() != '' else DEFAULT_IMAGE,
                'price': float(row['price']),
                'similarity': float(row['similarity']),
                'skin_type': row['skintype']
            })
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def health_check():
    return {
        "status": "healthy",
        "message": "GLAMEASE Recommender System API",
        "endpoints": {
            "mba": "/predict/mba",
            "skin_type": "/predict/skin-type"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)