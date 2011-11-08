import bottle
import json
import sqlite3
import os

from bottle import route, run, static_file, request
from bottle import view

conn = sqlite3.connect("testSys.db")
c = conn.cursor()	
c.row_factory = sqlite3.Row

def tplFiles(searchDirectory, stringTpl, endsWith):
	allfiles = []
	for root,dir,files in os.walk(searchDirectory):	
		filelist = [ os.path.join(root,fi) for fi in files if fi.endswith( endsWith ) ]
		for f in filelist: 
			f = f.replace("\\", "/");
			allfiles.append(stringTpl.replace("<>", f))
	return "\n".join(allfiles)

def tpl(fileName, tplVars):
	f = open(fileName, 'r')
	tmp = ""
	for line in f:
		for key in tplVars.keys():
			line = line.replace("{:%s:}" % key, tplVars[key])
		tmp += line+"\n"
	f.close()
	return tmp
	
def getClasses():
	res = ()
	c.execute("select id, name, description from class")
	res = [ dict(row) for row in c.fetchall()]
		
	return res

@route('/classes', method='GET')
def classes():
	c.execute("select id, name, description from class")
	return json.dumps( [ dict(row) for row in c.fetchall()] )
    
@route('/classes/:classId', method='GET')
def getClass(classId):
	c.execute("select * from class where id=%s" % classId)
	res = dict(c.fetchone())
	c.execute("select * from test where class_id=%s" % classId )
	res["tests"] = [ dict(row) for row in c.fetchall() ]
	
	return json.dumps( res )

@route('/classes/:classId', method='DELETE')
def getClass(classId):
	c.execute("delete from test where class_id = %s" % classId)
	c.execute("delete from class where id = %s" % classId)

@route('/classes/:classId', method='PUT')
def updateClass(classId):
	data = request.body.readline()
	entity = json.loads(data)
	c.execute("update class set name='%s', description='%s' where id=%s" % (entity["name"], entity["description"], classId) )
	return ""

@route('/classes', method='POST')
def addClass():
	data = request.body.readline()
	entity = json.loads(data)
	c.execute("insert into class(name, description) values('%s', '%s')" % (entity["name"], entity["description"]) )
	return ""
		
		
@route('/classes/:classId/tests/:testId', method='GET')
def getTest(classId, testId):
	c.execute("select * from test where id=%s" % testId)
	res = dict(c.fetchone())

	return json.dumps( res )	

@route('/classes/:classId/tests', method='POST')
def newTest(classId):
	data = request.body.readline()
	entity = json.loads(data)
	c.execute("insert into test(name, description, class_id) values('%s', '%s', %s)" % 
			(entity["name"], entity["description"], classId) )
	return ""

@route('/classes/:classId/tests/:testId', method='PUT')
def updateTest(classId, testId):
	data = request.body.readline()
	entity = json.loads(data)
	c.execute("update test set name='%s', description='%s' where id=%s" % (entity["name"], entity["description"], testId) )
	return ""

@route('/classes/:classId/tests/:testId', method='DELETE')
def getClass(classId, testId):
	c.execute("delete from test where id = %s" % testId)
	
@route('/:page#.*#')
def static(page):
	return static_file(page, root='.')


@route('/')
def index():
	addscripts = tplFiles(os.path.join('js', 'app'), '<script type="text/javascript" src="/<>"></script>', '.js')
	addcss = tplFiles('css', '<link href="/<>" media="all" rel="stylesheet" type="text/css" />', '.css')
	return tpl( "views/index.html", dict( addscripts=addscripts, addcss=addcss) )
		
bottle.debug(True) 
run()
