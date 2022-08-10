import serial.tools.list_ports
import requests
import time

ports = serial.tools.list_ports.comports()

serialInst = serial.Serial()

portList = []

for onePort in ports:
    portList.append(str(onePort))
    print(onePort)

val = input("select Port: COM")

for x in range(0, len(portList)):
    if portList[x].startswith("COM" + str(val)):
        portVar = "COM" + str(val)

        print(portList[x] + " selected")

serialInst.baudrate = 9600
serialInst.port = portVar
serialInst.open()


def updateData(temp, time):

    url = 'http://localhost:3001/data/' + str(temp)+'/'+str(time)

    x = requests.post(url=url)

    print("Local time:", time, "," "Temperature:", temp)
    print(x.text)


while True:

    local_time = time.ctime()
    if serialInst.in_waiting:
        packet = serialInst.readline()
        updateData(str(packet.decode('utf')), local_time)
