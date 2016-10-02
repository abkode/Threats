import os, json

from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'threats/index.html') # Set Index.html as the default page

def readData(request):
    
    contents = []
    json_dir_name = 'threats/files/' # Set JSON directory to read the files
    json_files = [pos_json for pos_json in os.listdir(json_dir_name) if pos_json.endswith('.json')] # Get only JSON files from the directory
    
    for js in json_files:
        with open(os.path.join(json_dir_name, js)) as json_file:
            contents.append(json.load(json_file))
            
    data = json.dumps(contents)
    return HttpResponse(data)