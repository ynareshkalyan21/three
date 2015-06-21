# Create your views here.
from django.shortcuts import render


def home(request):
    context = {'msg': 'Customize', 'path': request.path}
    return render(request, 'Apptestobj/home.html', context)

def editor(request):
    context = {'msg':'Customize','path':request.path}
    return  render(request,'Apptestobj/editor.html',context)


def step1(request):
    return render(request, "Apptestobj/1.htm", {})


def step2(request):
    return render(request, "Apptestobj/2.htm", {})


def step3(request):
    return render(request, "Apptestobj/3.htm", {})


def step4(request):
    return render(request, "Apptestobj/4.htm", {})


def step5(request):
    return render(request, "Apptestobj/5.htm", {})


def step6(request):
    return render(request, "Apptestobj/6.htm", {})


def step7(request):
    return render(request, "Apptestobj/7.htm", {})


def step8(request):
    return render(request, "Apptestobj/8.htm", {})


def step9(request):
    return render(request, "Apptestobj/9.htm", {})