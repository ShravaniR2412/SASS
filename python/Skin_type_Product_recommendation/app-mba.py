import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from mlxtend.frequent_patterns import apriori, association_rules
from collections import Counter

# --- Load and Prepare Data ---
@st.cache_data
def load_data():
    df = pd.read_csv("improved_fake_transactions_with_patterns.csv")
    transactions = df.values.tolist()
    transactions = [[str(item).strip() for item in row if pd.notna(item) and str(item).strip() != ''] for row in transactions]
    return transactions

# --- Encode Transactions ---
def encode_transactions(transactions):
    all_items = sorted(set(item for txn in transactions for item in txn))
    encoded_df = pd.DataFrame(0, index=range(len(transactions)), columns=all_items)
    for i, txn in enumerate(transactions):
        for item in set(txn):
            encoded_df.at[i, item] = 1
    return encoded_df

# --- Recommendations ---
def get_similar_recommendations(product, rules_df, top_n=5):
    recommendations = set()
    for _, row in rules_df.iterrows():
        if product in row['antecedents']:
            for item in row['consequents']:
                if item != product:
                    recommendations.add((
                        item,
                        round(row['confidence'], 2),
                        round(row['lift'], 2),
                        round(row['support'], 3)
                    ))
    recommendations = sorted(list(recommendations), key=lambda x: (x[1], x[2]), reverse=True)
    return recommendations[:top_n]

# --- Streamlit App ---
st.set_page_config(page_title="🛍️ Product Recommender", layout="wide")
st.title("🛒 GLAMEASE : Market Basket Analysis - Product Recommendation")

# --- Session State ---
if 'cart' not in st.session_state:
    st.session_state.cart = []

if 'product_selected_once' not in st.session_state:
    st.session_state.product_selected_once = False

transactions = load_data()
encoded_df = encode_transactions(transactions)

# Frequent itemsets & rules
frequent_itemsets = apriori(encoded_df, min_support=0.01, use_colnames=True)
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.2)
rules['antecedents'] = rules['antecedents'].apply(list)
rules['consequents'] = rules['consequents'].apply(list)

top_items = encoded_df.sum().sort_values(ascending=False).head(10)
all_unique_items = sorted(set(item for txn in transactions for item in txn))

# --- Product Selection ---
selected_product = st.selectbox("🔍 Select a product to get recommendations:", ["Select a product"] + all_unique_items)

# Only add to cart after user has selected something valid
if selected_product != "Select a product":
    if not st.session_state.product_selected_once:
        st.session_state.product_selected_once = True  # Mark that user made a real selection
    if selected_product not in st.session_state.cart:
        st.session_state.cart.insert(0, selected_product)

    recommendations = get_similar_recommendations(selected_product, rules)
    num_purchases = encoded_df[selected_product].sum()

    st.info(f"🧾 Bought by **{num_purchases}** customers", icon="🧍‍♂️")

    if recommendations:
        st.subheader(f"📦 Customers who bought **{selected_product}** also bought:")
        for idx, (item, conf, lift, supp) in enumerate(recommendations, 1):
            col1, col2 = st.columns([4, 1])
            with col1:
                st.markdown(f"**{idx}. {item}**  \nConfidence: `{conf}` | Lift: `{lift}` | Support: `{supp}`")
            with col2:
                if st.button(f"➕", key=f"add_{item}_{idx}"):
                    st.session_state.cart.append(item)
    else:
        st.warning("❌ No recommendations found. Try another product or lower thresholds.")

    # --- 🛒 Cart Display ---
    st.markdown("---")
    st.markdown("### 🧺 Items in Cart:")
    cart_counts = Counter(st.session_state.cart)

    for item, count in cart_counts.items():
        col1, col2 = st.columns([4, 1])
        with col1:
            label = f"🟢 **{item}**" if item == selected_product else item
            st.markdown(f"- {label}  —  Quantity: `{count}`")
        with col2:
            if st.button(f"➖", key=f"remove_{item}"):
                st.session_state.cart.remove(item)

    # --- ✅ Confirm Cart ---
    if st.button("✅ Confirm Cart"):
        st.success("🧾 Final Cart Items:")
        for item, count in Counter(st.session_state.cart).items():
            st.write(f"• {item} — Quantity: {count}")

    # --- 📊 Charts ---
    st.subheader("📊 Most Frequently Bought Items")
    st.bar_chart(top_items)

    # st.subheader("📈 Product Popularity Distribution")
    # fig2, ax2 = plt.subplots()
    # top_items_pct = top_items / top_items.sum()
    # ax2.pie(top_items_pct, labels=top_items_pct.index, autopct="%1.1f%%", startangle=140)
    # ax2.axis("equal")
    # st.pyplot(fig2)

st.markdown("---")
st.caption("🔧 Built with Streamlit, Apriori & Market Basket Analysis by GLAMEASE")
