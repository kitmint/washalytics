# Tests for chatbot functions
from django.test import TestCase
from openai import OpenAI
import json
import requests

def get_weather(latitude, longitude):
    response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m")
    data = response.json()
    return data['current']['temperature_2m']

client = OpenAI()

tools =[{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current temperature for provided coordinates in celsius.",
        "parameters": {
            "type": "object",
            "properties": {
                "latitude": {"type": "number"},
                "longitude": {"type": "number"}
            },
            "required": ["latitude", "longitude"],
            "additionalProperties": False
        },
        "strict": True
        
    }
}]

messages = [{"role": "user", "content": "อากาศที่กรุงเทพเป็นยังไง?"}]

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
)
print(completion.choices[0].message.tool_calls)

tool_call = completion.choices[0].message.tool_calls[0]
args = json.loads(tool_call.function.arguments)

result = get_weather(args["latitude"], args["longitude"])


messages.append(completion.choices[0].message)  # append model's function call message
messages.append({                               # append result message
    "role": "tool",
    "tool_call_id": tool_call.id,
    "content": str(result)
})

completion_2 = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
)

final_result = completion_2.choices[0].message.content
print(final_result)

## Todo 
# do django application
# Apply function_call to our app
# Prompt model to make it work with washalytics

# Problem
# ถ้าถามไม่เกี่ยวกับฟังก์ชันใด มันจะ return none

# Note : 
# ถามต่างภาษาใช้งานได้(คิดว่า) 
