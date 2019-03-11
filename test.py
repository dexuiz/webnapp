import requests
import time
lat,lng= 1903.56121,7302.2812
speed=0
while True:
	i=1
	j=5
	time.sleep(0.5)
	requests.post("http://localhost:5000/realtime",{"key":"lat:{0} long:{1} speed:{2} offense:sleeping".format(lat,lng,speed)})
	print("sent lat:{0} long:{1} speed:{2} offense:safe".format(lat,lng,speed))
	lat+=i
	lng+=i
	speed+=j	