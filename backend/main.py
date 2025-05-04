from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ Only allow frontend origin in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BINANCE_API_URL = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=30"

@app.get("/api/history")
async def get_price_data():
    async with httpx.AsyncClient() as client:
        response = await client.get(BINANCE_API_URL)
        data = response.json()

        # Extract timestamps and prices
        timestamps = [item[0] for item in data]
        prices = [float(item[4]) for item in data]  # Close prices

        return {"timestamps": timestamps, "prices": prices}
