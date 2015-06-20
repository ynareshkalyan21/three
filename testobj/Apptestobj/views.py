# Create your views here.
from django.shortcuts import render


def home(request):
    context = {'msg': 'Customize', 'path': request.path}
    return render(request, 'Apptestobj/home.html', context)

def editor(request):
    context = {'msg':'Customize','path':request.path}
    return  render(request,'Apptestobj/editor.html',context)