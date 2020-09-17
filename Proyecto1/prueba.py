import sys
from socket import *

serverHost = '192.168.1.10'
serverPort = 8080

message = ['UNO', 'DOS']

if len(sys.argv) > 1:
    serverHost = sys.argv[1]

#Create a socket
sSock = socket(AF_INET, SOCK_STREAM)

#Connect to server
chunks = []
bytes_recd = 0
MSGLEN=1024
sSock.connect((serverHost, serverPort))


#Send messages
for item in message:
    sSock.send(item)
    data = sSock.recv(1024)
    print ('Client received: ', data)

sSock.close()
