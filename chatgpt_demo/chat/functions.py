import random
import re  # Regular expression library (Function to check machine availability)
from langdetect import detect  # Import language detection library
import joblib
import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO
from base64 import b64encode


def check_machine_availability(user_message):
    """Simulates checking if a specific washing machine is available based on the user message."""
    
    # Detect the language of the user message
    detected_language = detect(user_message)
    
    # Try to extract machine ID from the message using regex
    match = re.search(r'Machine=(\d+)', user_message)
    
    if match:
        machine_id = match.group(1)  # Extracted machine ID
        available = random.choice([True, False])
        status = "available" if available else "in use"
        
        # Respond in the same language as the user's message
        if detected_language == 'th':  # Thai
            return f"เครื่อง {machine_id} ตอนนี้ {status}."
        else:  # Default to English
            return f"Machine {machine_id} is currently {status}."
    else:
        # Handle missing machine ID in user's message
        if detected_language == 'th':  # Thai
            return "กรุณาระบุหมายเลขเครื่อง (เช่น Machine=20) เพื่อเช็คสถานะ"
        else:  # Default to English
            return "Please provide a valid machine ID (e.g., Machine=20) to check availability."
        
# Function to calculate revenue
def calculate_revenue(start_date, end_date):
    """Simulates calculating total revenue within a date range."""
    revenue = round(random.uniform(1000, 5000), 2)  # Mock revenue data
    return f"Total revenue from {start_date} to {end_date} is ${revenue}."


# Function to predict future income
def predict_income_model(future_days):
    # Load SARIMA model (we assume it's pre-trained and saved)
    model = joblib.load('Predict_Income1.joblib')

    # You might need to modify the `file_path` and data reading logic as per your file
    file_path = "WashAnalytics_datafinal1.csv"  # Change the path as needed
    data = pd.read_csv(file_path, parse_dates=["NewDate"], index_col="NewDate")

    # Resample data to monthly means
    data_monthly = data['SumTotal'].resample('M').mean()

    # Calculate the number of months to forecast
    future_months = max(1, future_days // 30)  # Convert days to months
    future_dates = pd.date_range(start=data_monthly.index[-1], periods=future_months + 1, freq='M')[1:]

    # Forecast using the loaded SARIMA model
    forecast = model.forecast(steps=future_months).round()

    # Create a DataFrame to store the forecast results
    forecast_df = pd.DataFrame({"Date": future_dates, "Predicted_Income(THB)": forecast})
    
    # Plot the results
    full_dates = pd.concat([pd.Series(data_monthly.index), pd.Series(future_dates)]).reset_index(drop=True)
    full_values = pd.concat([data_monthly, pd.Series(forecast, index=future_dates)]).reset_index(drop=True)


    split_date = data_monthly.index[-1]

    # Create the plot
    plt.figure(figsize=(12, 6))
    plt.plot(full_dates, full_values, label="Actual & Forecasted Income", color="#29B6F6", 
             linewidth=2, marker='o', linestyle='-')
    plt.axvline(x=split_date, color="gray", linestyle="--", linewidth=1.5, label="Forecast Start")
    plt.xlabel("Date", fontsize=12)
    plt.ylabel("Income (THB)", fontsize=12)
    plt.title(f"Laundry Shop Income Forecast (Next {future_months} Months)", fontsize=14, fontweight="bold")
    plt.xticks(rotation=45)
    plt.grid(True, linestyle="--", alpha=0.6)
    plt.gca().spines["top"].set_visible(False)
    plt.gca().spines["right"].set_visible(False)
    plt.legend(fontsize=12, loc="upper left")
    plt.tight_layout()

    # Save graph to a BytesIO object and encode to base64
    img_buffer = BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)
    img_str = b64encode(img_buffer.read()).decode('utf-8')
    plt.close()  # Close the plot to free memory

    return img_str, forecast_df

# chat/functions.py
def predict_value_from_user_query(user_message):
    
    detected_language = detect(user_message)

    # List of keywords/phrases referring to income (both Thai and English)
    income_keywords = ['income', 'รายได้', 'revenue', 'รายรับ', 'income forecast', 'forecast income','in the future','ในอนาคต','ล่วงหน้า']

    # Extract the number of days from the user message
    days_match = re.search(r'(\d+)\s*(days?|วัน)', user_message)
    
    if not days_match:
        # Detect the language of the user message
        if detected_language == 'th':  # Thai
            return "กรุณาระบุจำนวนวันที่ต้องการให้พยากรณ์ เช่น 'พยากรณ์รายได้ 90 วันข้างหน้า'"
        else:  # Default to English
            return "Please Provide The Duration For Prediction ex.'Future 30 Day'"
    
    future_days = int(days_match.group(1))  # Extracted number of days

    # Check if the user wants to predict income
    if any(keyword.lower() in user_message.lower() for keyword in income_keywords):
        # prediction_type = "Income"
        # Predict future income using the SARIMA model
        graph_data, forecast_df = predict_income_model(future_days)

        # Optionally, return the graph and summation (for example)
        total_forecasted_income = forecast_df['Predicted_Income(THB)'].sum()

        return {
            'graph': graph_data, 
            'total_forecasted_income': total_forecasted_income,
            'forecast_details': forecast_df.to_dict(orient="records")  # optional, for detailed forecast
        }

    else:
        if detected_language == 'th':  # Thai
            return "กรุณาระบุสิ่งที่ต้องการให้พยากรณ์ --> รายได้'"
        else:  # Default to English
            return "Please specify what you want to predict --> Income."
