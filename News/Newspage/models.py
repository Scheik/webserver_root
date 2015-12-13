from django.db import models
from tinymce.models import HTMLField

class posts(models.Model):

	author = models.CharField(max_length = 40)
	title = models.CharField(max_length = 200)
	bodytext = HTMLField()
	timestamp = models.DateTimeField()
	
	def __unicode__(self): #Python 3 is __str__
		return self.title