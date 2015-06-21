from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       url(r'^$', 'Apptestobj.views.editor', name='editor'),
                       url(r'^home/', 'Apptestobj.views.home', name='home'),


                       # Uncomment the admin/doc line below to enable admin documentation:
                       url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

                       # Uncomment the next line to enable the admin:
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^step1', "Apptestobj.views.step1", name="step1"),
                       url(r'^step2', "Apptestobj.views.step2", name="step2"),
                       url(r'^step3', "Apptestobj.views.step3", name="step3"),
                       url(r'^step4', "Apptestobj.views.step4", name="step4"),
                       url(r'^step5', "Apptestobj.views.step5", name="step5"),
                       url(r'^step6', "Apptestobj.views.step6", name="step6"),
                       url(r'^step7', "Apptestobj.views.step7", name="step7"),
                       url(r'^step8', "Apptestobj.views.step8", name="step8"),
                       url(r'^step9', "Apptestobj.views.step9", name="step9"),
)
