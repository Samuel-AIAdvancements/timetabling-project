import requests
import json

base_url = "http://localhost:5000/timetable/"

# Method to pretty print the JSON
def print_json(json_data):
    print(json.dumps(json_data, indent=4))

# Load the timetable with an id of 1
response = requests.get(base_url+"load/1")
timetable = response.json().get("timetable")
print("Loaded Timetable:")
print_json(timetable)

# Shift a class
shift_data = {
    "timetable": timetable,
    "slotX": 0,
    "slotY": 0,
    "newSlotX": 1,
    "newSlotY": 0 
}
response = requests.post(base_url+"shift", json=shift_data)
timetable = response.json().get("updatedTimetable")

print("Shifting (0,0) to (1,0)")
print("After Shifting:")
print_json(response.json())

# Use the moveFirstAvailable route
move_first_data = {
    "timetable": timetable,
    "slotX": 1,
    "slotY": 1
}
response = requests.post(base_url+"moveToFirstAvailable", json=move_first_data)
timetable = response.json().get("updatedTimetable")

print("Shifting (1,1) to First Avaliable Slot")
print("After Moving To First Available:")
print_json(response.json())

# Save the Timetable
save_data = {
    "timetable": timetable,
    "id": "2"
}
response = requests.post(base_url+"save", json=save_data)

print("Attempting to save timetable with id: 2)")
print_json(response.json())
