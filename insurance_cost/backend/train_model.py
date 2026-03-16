import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score

# Load dataset
df = pd.read_csv("insurance.csv")

# Encode categorical columns (same logic used in API)
df["gender"] = df["gender"].map({"male":1, "female":0})
df["smoker"] = df["smoker"].map({"yes":1, "no":0})
df["region"] = df["region"].map({
    "southeast":0,
    "southwest":1,
    "northwest":2,
    "northeast":3
})

# Define features and target
X = df[["age","gender","bmi","children","smoker","region"]]
y = df["charges"]

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("R2 Score:", r2_score(y_test, y_pred))

# Save model
joblib.dump(model, "model.pkl")

print("Model saved successfully as model.pkl")