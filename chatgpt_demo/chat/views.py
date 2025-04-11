from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
from openai import OpenAI
from .functions import check_machine_availability, calculate_revenue, predict_value_from_user_query
# Define your chatbot view with CSRF exemption
import re

tools = [
  
    {
        "type": "function",
        "function": {
            "name": "check_machine_availability",
            "description": "Check if a specific washing machine is available.",
            "parameters": {
                "type": "object",
                "properties": {
                    "machine_id": {
                        "type": "string",
                        "description": "The ID of the washing machine"
                    }
                },
                "required": ["machine_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "calculate_revenue",
            "description": "Calculate the total revenue between two dates.",
            "parameters": {
                "type": "object",
                "properties": {
                    "start_date": {
                        "type": "string",
                        "description": "Start date in YYYY-MM-DD format"
                    },
                    "end_date": {
                        "type": "string",
                        "description": "End date in YYYY-MM-DD format"
                    }
                },
                "required": ["start_date", "end_date"]
            }
        }
    }
]


# Initialize OpenAI API client
client = OpenAI(api_key=settings.OPENAI_API_KEY)

# Function to detect prediction intent based on user message
def detect_prediction_intent(user_message):
    # List of keywords that indicate a prediction-related message
    prediction_keywords = ['predict', 'forecast', 'estimate', 'พยากรณ์', 'คาดการณ์', 'ทำนาย']

    # Check if any keyword exists in the user message (case-insensitive)
    if any(keyword in user_message.lower() for keyword in prediction_keywords):
        return True
    return False

@csrf_exempt
def chat_view(request):
    if request.method == "POST":
        user_message = request.POST.get("message", "")

        # Step 1: Check if the user message has prediction-related intent
        if detect_prediction_intent(user_message):
            # If the message contains prediction-related intent, call predict_value_from_user_query
            model_prediction_response = predict_value_from_user_query(user_message)

            if isinstance(model_prediction_response, dict) and 'graph' in model_prediction_response:
                return JsonResponse({
                    'response': f"ผลการพยากรณ์รายได้รวม: {model_prediction_response['total_forecasted_income']:.2f} บาท",
                    'graph': model_prediction_response['graph']
                })
            else:
                # If prediction logic is missing or incomplete
                return JsonResponse({'response': model_prediction_response})
        
        # Step 2: If no prediction intent, pass the user message to OpenAI GPT for general processing
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": '''คุณชื่อ สมศรี คุณคือผู้ช่วยสำหรับใช้งานแอพพลิเคชัน WashAlytics ที่สามารถตอบโต้ได้ทั้งภาษาไทยและอังกฤษ  ซึ่งเป็นแอปพลิเคชันสำหรับการจัดการดูแลระบบหลังบ้านของร้านซักผ้าหยอดเหรียญโดยมีฟังก์ชันการ
                    ทำงานที่ทำให้ผู้ประกอบได้เห็นถึงภาพรวมของธุรกิจ แล้วนำข้อมูลที่ได้มาวิเคราะห์เพื่อให้ผู้ประกอบการได้นำไปใช้ในการตัดสินใจและในการขยายธุรกิจได้
         
        โดยมีฟังก์ชันหลักภายในแอพพลิเคชัน ดังนี้WashAlytics มีฟังก์ชันหลักภายในแอพพลิเคชัน ดังนี้ 
        1.Login and Register จะเป็นฟังก์ชันที่ถูกใช้งานเพียงครั้งเดียวเมื่อผู้ใช้เริ่มต้นใช้แอพพลิเคชัน โดยในการลงทะเบียน(Register)แรกเริ่ม 
         ผู้ใช้ จะต้องใส่ชื่อร้านซักอบของตนเอง รวมถึงรหัสการลงทะเบียน (แฟรนช์ไชส์) ที่อยู่ และชื่อเจ้าของ(ผู้ใช้) ซึ่งข้อมูลอื่นๆสามารถแก้ไขได้ในหน้า Profile ภายหลัง 
        2.Home หน้าหลักที่จะพาไปหน้าต่างๆ
        3.Analytics สำหรับใช้ดูประวัติการใช้งานเครื่องซักและเครื่องอบภายในร้าน รวมถึงประวัติรายรับรายจ่าย ทั้งรายวัน รายเดือน และรายปี
        4.Machine สำหรับใช้ดูสถานะ ข้อมูลประจำเครื่อง ของเครื่องซัก และเครื่องอบภายในร้าน ทั้งจำนวน,รุ่น,ขนาด รวมถึงประสิทธิภาพ
        5.Finance ช่วยให้ผู้ใช้สามารถติดตามและอัพเดตรายรับ(จากการใช้งานเครื่องซัก เครื่องอบของผู้บริโภคในร้าน) รวมถึงรายจ่าย เช่น ค่าน้ำ ค่าไฟ ค่าบำรุงรักษา
        6.Predictions เป็นฟังก์ชันที่จะช่วยทำนายแนวโน้มของข้อมูลในอนาคตโดยอ้างอิงจากประวัติที่มี อย่างเช่น ทำนายรายได้ในอนาคต , '''},
                {"role": "user", "content": user_message}
            ],
            tools=tools
        )

        tool_calls = response.choices[0].message.tool_calls
        if tool_calls:
            tool_call = tool_calls[0]
            function_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)

            if function_name == "check_machine_availability":
                result = check_machine_availability(user_message)
            elif function_name == "calculate_revenue":
                result = calculate_revenue(arguments.get("start_date"), arguments.get("end_date"))
            else:
                result = "Sorry, I cannot process this request."

            return JsonResponse({"response": result})

        # Step 3: If no function call, fallback to GPT reply
        ai_message = response.choices[0].message.content
        return JsonResponse({'response': ai_message})

    return render(request, 'chat/chat.html')
